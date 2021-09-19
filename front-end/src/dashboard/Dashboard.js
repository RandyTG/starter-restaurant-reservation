import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const { search } = useLocation();
  if (search) {
    const index = search.indexOf("=");
    date = search.slice(index + 1);
  }
  //put this in its own component within dashboard
  //for button control
  const dateChangeHnalder = (x) => {
    let currentDay = new Date(date.concat("T", "14:00:00.000Z"));
    let day = currentDay.setDate(currentDay.getDate() + x);
    const requestDay = new Date(day).toISOString().slice(0, 10);
    history.push(`/dashboard?date=${requestDay}`);
  };
  const history = useHistory();

  //
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <br></br>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          onClick={() => dateChangeHnalder(-1)}
          type="button"
          className="btn btn-primary"
        >
          Previous Day
        </button>
        <button
          onClick={() => dateChangeHnalder(1)}
          type="button"
          className="btn btn-primary"
        >
          Next Day
        </button>
        <button
          onClick={() => history.push(`/dashboard`)}
          type="button"
          className="btn btn-primary"
        >
          Today
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
