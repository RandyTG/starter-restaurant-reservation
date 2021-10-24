const knex = require("../db/connection");

function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

function list(date) {
  const now = new Date().toISOString().slice(0, 10);
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .whereNot({ status: "cancelled " })
      .orderBy("reservation_time");
  } else {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: now })
      .whereNot({ status: "finished" })
      .whereNot({ status: "cancelled" })
      .orderBy("reservation_time");
  }
}

function read(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedReservation) => updatedReservation[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  search,
  update,
  create,
  list,
  read,
};
