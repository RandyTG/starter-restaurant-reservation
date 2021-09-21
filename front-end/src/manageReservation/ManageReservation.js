import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ManageReservation() {
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState({
    table_id: "",
  });
  const history = useHistory();
  const { reservationId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    readReservation(reservationId, abortController.signal).then(setReservation);
    return () => abortController.abort();
  }, [reservationId]);

  const options = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setTablesError(null);
    event.preventDefault();
    try {
      await updateTable(formData.table_id, {
        reservation_id: reservationId,
      }).then(history.push("/dashboard"));
    } catch (error) {
      setTablesError(error);
    }
  };

  return (
    <main>
      <div>
        <h2>Manage Reservation</h2>
        <ErrorAlert error={tablesError} />
        <li className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {reservation.first_name} {reservation.last_name}
            </div>
          </div>
          <span className="badge bg-primary rounded-pill">
            Party size:{reservation.people}
          </span>
        </li>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="table_id">Select Table</label>
            <br />
            <select
              onChange={handleChange}
              className="form-select"
              name="table_id"
              aria-label="Default select example"
            >
              <option defaultValue>Open this select menu</option>
              {options}
            </select>
          </div>
          <button
            onClick={() => history.push("/dashboard")}
            className="mr-2 btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="mr-2 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default ManageReservation;
