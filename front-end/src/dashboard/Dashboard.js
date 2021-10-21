import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Pagination from "./Pagination";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../utils/Reservation";
import Table from "./Table";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  //parses search query parameter if any
  const { search } = useLocation();
  if (search) {
    const index = search.indexOf("=");
    date = search.slice(index + 1);
  }

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [componentReload, setComponentReload] = useState(false);

  useEffect(loadDashboard, [date, componentReload]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  const resDate = date.split("-");
  const orderedDate = [resDate[1], resDate[2], resDate[0]].join("/");

  return (
    <main className="ml-0 ">
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {orderedDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row ">
        <div className="col-md-8">
          {reservations.length
            ? reservations.map((data) => {
                if (data.status === "finished" || data.status === "cancelled") {
                  return null;
                } else {
                  return (
                    <Reservation
                      key={data.reservation_id}
                      componentReload={componentReload}
                      setComponentReload={setComponentReload}
                      reservation={data}
                      buttons={true}
                    />
                  );
                }
              })
            : null}
        </div>
        {tables.length ? (
          <div className="col-md-4">
            <ul className="list-group">
              {tables.map((data) => (
                <Table
                  key={data.table_id}
                  componentReload={componentReload}
                  setComponentReload={setComponentReload}
                  data={data}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <br></br>
      <Pagination date={date} />
    </main>
  );
}

export default Dashboard;
