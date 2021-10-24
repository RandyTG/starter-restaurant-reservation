import React, { useState } from "react";
import { deleteTableAssignment } from "../utils/api";

function Table({ data, setComponentReload, componentReload }) {
  const [occupied, setOccupied] = useState(data.reservation_id ? true : false);

  const unseatButtonHandler = async () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await deleteTableAssignment(data.table_id);
      setComponentReload(!componentReload);
      setOccupied(false);
    }
  };

  return (
    <li className="mb-2 p-3 rounded-1 shadow-sm list-group-item align-items-start">
      <div className="ms-2 me-auto d-flex justify-content-between">
        <h5 className="fw-bold">{data.table_name}</h5>
        <h6
          className={occupied ? "status-occupied" : "status-text"}
          data-table-id-status={data.table_id}
        >
          {occupied ? "OCCUPIED" : "FREE"}
        </h6>
      </div>
      <h6 className="card-subtitle mb-2 text-muted">
        Table capacity: {data.capacity}
      </h6>
      {occupied ? (
        <button
          onClick={unseatButtonHandler}
          data-table-id-finish={data.table_id}
          className="mr-2 btn btn-can"
        >
          Finish
        </button>
      ) : null}
    </li>
  );
}

export default Table;
