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

function isReservationValid(req, res, next) {
  const { data } = req.body;
  const today = new Date();
  console.log(data.people);
  const { people } = data;
  const date = new Date(
    data.reservation_date.concat("T", `${data.reservation_time}:00.000Z`)
  );
  const adjustedDate = new Date(date.getTime() + 14400000);
  if (adjustedDate.getDay() === 2 && adjustedDate.getDate() < today.getDate()) {
    return next({
      status: 400,
      message: [
        "Reservations cannot be made on a Tuesday.",
        "Reservations cannot be made on a date in the past.",
      ],
    });
  } else if (
    adjustedDate.getDate() < adjustedDate.getDate() ||
    adjustedDate.getTime() < today.getTime()
  ) {
    return next({
      status: 400,
      message: ["Reservations cannot be made on a date in the past."],
    });
  } else if (adjustedDate.getDay() === 2) {
    return next({
      status: 400,
      message: ["Reservations cannot be made on a Tuesday."],
    });
  } else if (adjustedDate.getHours() <= 10 && adjustedDate.getMinutes() <= 29) {
    return next({
      status: 400,
      message: ["Reservations cannot be made before 10:30 AM."],
    });
  } else if (adjustedDate.getHours() >= 21 && adjustedDate.getMinutes() >= 31) {
    return next({
      status: 400,
      message: ["Reservations cannot be made after 9:30 PM."],
    });
  } else if (isNaN(people)) {
    return next({
      status: 400,
      message: ["Reservations party needs to be at least 1"],
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    return next();
  }
  return next({ status: 404, message: ["Reservation cannot be found."] });
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
    const phoneNumber = req.query.mobile_phone;
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

async function read(req, res) {
  const { reservationId } = req.params;
  const response = await service.read(reservationId);
  if (!response) {
    res.status(404).json({ error: "Reservation cannot be found" });
  }
  res.json({ data: response });
}

async function update(req, res) {
  const { reservationId } = req.params;

  const updatedReservation = {
    ...req.body.data,
    reservation_id: reservationId,
  };
  await service.update(updatedReservation);
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(reservationExists),
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
  read: asyncErrorBoundary(read),
};
