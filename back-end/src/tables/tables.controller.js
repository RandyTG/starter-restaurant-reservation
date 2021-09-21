const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasPeoperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

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

async function tableExists(req, res, next) {
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: ["Table cannot be found."] });
}

async function tableIsNotOccupied(req, res, next) {
  if (!res.locals.table.reservation_id) {
    return next();
  }
  return next({ status: 400, message: ["Table is occupied"] });
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
  const { tableId } = req.params;

  const updatedTable = {
    ...req.body.data,
    table_id: tableId,
  };
  await service.update(updatedTable);
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableIsNotOccupied),
    asyncErrorBoundary(update),
  ],
};
