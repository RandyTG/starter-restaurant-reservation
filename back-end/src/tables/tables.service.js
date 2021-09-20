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

module.exports = {
  create,
  list,
};
