import React from "react";

function Reservation({ data }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {data.first_name} {data.last_name}
        </div>
        {data.mobile_number} {data.reservation_date} {data.reservation_time}
      </div>
      <span className="badge bg-primary rounded-pill">{data.people}</span>
      <a
        className="btn btn-outline-primary"
        href={`/reservations/${data.reservation_id}/seat`}
        role="button"
      >
        Seat
      </a>
    </li>
  );
}

export default Reservation;
