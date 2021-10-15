const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdPost) => createdPost[0]);
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

function destroy(tableId) {
  return knex("tables")
    .select("*")
    .where({ table_id: tableId })
    .update({ reservation_id: null });
}

module.exports = {
  create,
  list,
  update,
  read,
  readReservation,
  delete: destroy,
};
