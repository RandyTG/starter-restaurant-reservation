const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasPeoperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFileds = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFileds.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFileds.join(", ")}`,
    });
  }
  next();
}

function isStatusChangeValid(req, res, next) {
  const { data } = req.body;
  const validStatus = ["booked", "seated", "finished", "cancelled"];

  if (!validStatus.includes(data.status)) {
    return next({
      status: 400,
      message: `Status ${data.status} is not valid`,
    });
  }

  const currentReservationData = res.locals.reservation;
  if (currentReservationData.status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated",
    });
  }

  next();
}

function isReservationValid(req, res, next) {
  const { data } = req.body;
  const { people } = data;
  let { status } = data;

  if (res.locals.reservation) {
    const currentReservationData = res.locals.reservation;
    if (currentReservationData.status === "finished") {
      next({
        status: 400,
        message: "a finished reservation cannot be updated",
      });
    }
    const updatedData = Object.values(data);
    const currentData = Object.values(currentReservationData);

    if (
      new Date(data.reservation_date).toString() ==
      currentReservationData.reservation_date.toString()
    ) {
      const similarValues = currentData.filter((value) =>
        updatedData.includes(value)
      );

      if (
        similarValues.length >= 6 &&
        data.status !== currentReservationData.status
      ) {
        return next();
      }
    }
  }

  if (!status) {
    status = "booked";
  }

  const today = new Date();
  const date = new Date(
    data.reservation_date
      .slice(0, 10)
      .concat("T", `${data.reservation_time.slice(0, 5)}:00.000Z`)
  );
  const adjustedDate = new Date(date.getTime() + 14400000);
  if (date == "Invalid Date") {
    return next({
      status: 400,
      message: "reservation_time or reservation_date properies are invalid.",
    });
  } else if (
    adjustedDate.getDay() === 2 &&
    adjustedDate.getDate() < today.getDate()
  ) {
    return next({
      status: 400,
      message:
        "Reservations cannot be made on a Tuesday as the restaurant is closed. Reservations cannot be made on a date in the past. Only future reservations.",
    });
  } else if (
    adjustedDate.getDate() < adjustedDate.getDate() ||
    adjustedDate.getTime() < today.getTime()
  ) {
    return next({
      status: 400,
      message:
        "Reservations cannot be made on a date in the past. Only future reservations.",
    });
  } else if (adjustedDate.getDay() === 2) {
    return next({
      status: 400,
      message:
        "Reservations cannot be made on a Tuesday as the restaurant is closed.",
    });
  } else if (
    adjustedDate.getHours() <= 10 ||
    (adjustedDate.getHours() <= 10 && adjustedDate.getMinutes() <= 29)
  ) {
    return next({
      status: 400,
      message: "Reservations cannot be made before 10:30 AM.",
    });
  } else if (
    adjustedDate.getHours() >= 21 ||
    (adjustedDate.getHours() >= 21 && adjustedDate.getMinutes() >= 31)
  ) {
    return next({
      status: 400,
      message: "Reservations cannot be made after 9:30 PM.",
    });
  } else if (typeof people !== "number") {
    return next({
      status: 400,
      message: "Reservations party needs a number of people",
    });
  } else if (people < 0) {
    return next({
      status: 400,
      message: "Reservations party needs to be at least 1",
    });
  } else if (status !== "booked") {
    return next({
      status: 400,
      message: `status can not be ${status}`,
    });
  }

  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const date = req.query.date;
  if (!date) {
    const phoneNumber = req.query.mobile_number;
    const response = await service.search(phoneNumber);
    if (!response) {
      res.json({
        data: [],
      });
    }
    res.json({ data: response });
  }
  const response = await service.list(date);
  if (!response) {
    res.json({
      data: [],
    });
  } else {
    res.json({ data: response });
  }
}

function read(req, res) {
  const response = res.locals.reservation;
  res.json({ data: response });
}

async function update(req, res) {
  const { reservation_id } = req.params;

  const updatedReservation = {
    ...req.body.data,
    reservation_id: reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.json({ data });
}

module.exports = {
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    isStatusChangeValid,
    asyncErrorBoundary(update),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    isReservationValid,
    asyncErrorBoundary(update),
  ],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isReservationValid,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
};
