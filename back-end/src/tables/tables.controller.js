const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasPeoperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasReservationId = hasProperties("reservation_id");

const VALID_PROPERTIES = ["table_name", "capacity"];

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

function isTableValid(req, res, next) {
  const { data } = req.body;

  const { table_name } = data;
  if (table_name.length === 1) {
    return next({
      status: 400,
      message: "table_name must be at least 2 characters",
    });
  } else if (typeof data.capacity !== "number") {
    return next({
      status: 400,
      message: "Table capacity must be a number",
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: `Table ${table_id} cannot be found.` });
}

function tableIsOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next();
  }
  return next({ status: 400, message: "Table is occupied" });
}

function tableIsNotOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next({ status: 400, message: "Table is not occupied" });
  }
  next();
}

async function partyAlreadySeated(req, res, next) {
  const reservation = { ...req.body.data };
  const reservationData = await service.readReservation(reservation);

  if (!reservationData) {
    return next({
      status: 404,
      message: `Reservation ${reservation.reservation_id} does not exist`,
    });
  } else if (reservationData.status === "seated") {
    return next({ status: 400, message: "Reservation is already seated" });
  }
  res.locals.reservation = reservationData;
  next();
}

function doesPartyFit(req, res, next) {
  const reservationData = res.locals.reservation;
  if (res.locals.table.capacity < reservationData.people) {
    return next({
      status: 400,
      message: "Table does not have capacity for party size.",
    });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const response = await service.list();
  res.json({ data: response });
}

async function update(req, res) {
  const { table_id } = req.params;

  const updatedTable = {
    ...req.body.data,
    table_id: table_id,
  };
  const data = await service.update(updatedTable);

  res.json({ data });
}

async function destoy(req, res) {
  const reservation = res.locals.table.reservation_id;
  const data = await service.delete(req.params.table_id, reservation);
  res.json({ data });
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    isTableValid,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  update: [
    hasReservationId,
    asyncErrorBoundary(partyAlreadySeated),
    asyncErrorBoundary(tableExists),
    doesPartyFit,
    tableIsOccupied,
    asyncErrorBoundary(update),
  ],

  delete: [
    asyncErrorBoundary(tableExists),
    tableIsNotOccupied,
    asyncErrorBoundary(destoy),
  ],
};
