import React from "react";
import { updateStatus } from "../utils/api";

function Reservation({
  reservation,
  setComponentReload,
  componentReload,
  buttons,
}) {
  const { reservation_id } = reservation;

  const handleCancelButton = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      reservation.status = "cancelled";
      await updateStatus(reservation.reservation_id, reservation);
      setComponentReload(!componentReload);
    }
  };

  let reservationTime = "";

  if (reservation.reservation_time) {
    const time = reservation.reservation_time.slice(0, 5).split(":");
    if (time[0] > 12) {
      const regTime = time[0] - 12;
      time[0] = regTime;
    }
    reservationTime = time.join(":");
  }

  let reservationDate = "";

  if (reservation.reservation_date) {
    const date = reservation.reservation_date.slice(0, 10).split("-");
    reservationDate = [date[1], date[2], date[0]].join("/");
  }

  return (
    <div className="col">
      <div className="card shadow-sm p-3 mb-4 bg-body rounded-1">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title ">
              {reservation.first_name} {reservation.last_name}
            </h5>
            <h6
              data-reservation-id-status={reservation.reservation_id}
              className={
                reservation.status === "booked"
                  ? "status-text text-uppercase"
                  : "status-occupied text-uppercase"
              }
            >
              {reservation.status}
            </h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="card-subtitle mb-2 text-muted">{reservationTime}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{reservationDate}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <p className="card-text">{reservation.mobile_number}</p>
            <p className="card-text ">Party of {reservation.people}</p>
          </div>

          {reservation.status === "booked" && buttons ? (
            <div className="">
              <a
                className="mr-2 btn btn-prm "
                href={`/reservations/${reservation_id}/seat`}
                role="button"
              >
                Seat
              </a>
              <a
                className="mr-2 btn btn-sec "
                href={`/reservations/${reservation_id}/edit`}
                role="button"
              >
                Edit
              </a>
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                className="btn btn-can"
                onClick={handleCancelButton}
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
