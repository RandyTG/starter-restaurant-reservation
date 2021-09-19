const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdPost) => createdPost[0]);
}

function list(date) {
  const now = new Date().toISOString().slice(0, 10);
  if (date) {
    return knex("reservations").select("*").where({ reservation_date: date });
  } else {
    return knex("reservations").select("*").where({ reservation_date: now });
  }
}

module.exports = {
  create,
  list,
};
