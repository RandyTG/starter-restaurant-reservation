const knex = require("../db/connection");

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdPost) => createdPost[0]);
}

function list() {
  return knex("tables").select("*");
}

function read(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

function update(updatedTable) {
  console.log(updatedTable);
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

module.exports = {
  create,
  list,
  update,
  read,
};
