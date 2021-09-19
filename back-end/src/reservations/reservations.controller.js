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
  const date = new Date(data.reservation_date.concat("T", "14:00:00.000Z"));
  if (date.getDay() === 2 && date.getDate() < today.getDate()) {
    return next({
      status: 400,
      message:
        "Reservations cannot be made on a Tuesday or a date in the past.",
    });
  } else if (date.getDate() < today.getDate()) {
    return next({
      status: 400,
      message: "Reservations cannot be made on a date in the past.",
    });
  } else if (date.getDay() === 2) {
    return next({
      status: 400,
      message: "Reservations cannot be made on a Tuesday.",
    });
  }
  next();
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
  const response = await service.list(date);
  if (!response) {
    res.json({
      data: [],
    });
  } else {
    res.json({ data: response });
  }
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isReservationValid,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
