import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../utils/Reservation";
import SeatForm from "./SeatForm";

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
      });
      history.push("/dashboard");
    } catch (error) {
      setTablesError(error);
    }
  };

  return (
    <main>
      <div>
        <h2>Manage Reservation</h2>
        <ErrorAlert error={tablesError} />
        <Reservation reservation={reservation} buttons={false} />
        <SeatForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          tables={tables}
          history={history}
        />
      </div>
    </main>
  );
}

export default ManageReservation;
