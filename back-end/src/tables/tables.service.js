const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function readReservation(updatedTable) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedTable.reservation_id })
    .first();
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function destroy(tableId, reservationId) {
  return knex.transaction(async (t) => {
    await knex("reservations")
      .where({ reservation_id: reservationId })
      .update({ status: "finished" })
      .transacting(t);
    return knex("tables")
      .where({ table_id: tableId })
      .update({ reservation_id: null });
  });
}

module.exports = {
  create,
  list,
  update,
  read,
  readReservation,
  delete: destroy,
};
