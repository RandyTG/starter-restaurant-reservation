import React from "react";

function Table({ data }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{data.table_name}</div>
        <p data-table-id-status={data.table_id}>
          {data.reservation_id ? "Occupied" : "Free"}
        </p>
      </div>
      <span className="badge bg-primary rounded-pill">{data.capacity}</span>
    </li>
  );
}

export default Table;
