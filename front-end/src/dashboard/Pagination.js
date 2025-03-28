import React from "react";
import { useHistory } from "react-router";

function Pagination({ date }) {
  const dateChangeHnalder = (x) => {
    let currentDay = new Date(date.concat("T", "14:00:00.000Z"));
    let day = currentDay.setDate(currentDay.getDate() + x);
    const requestDay = new Date(day).toISOString().slice(0, 10);
    history.push(`/dashboard?date=${requestDay}`);
  };
  const history = useHistory();

  return (
    <div className="container row-12 btn-group justify-content-center mb-1">
      <div
        className="btn-group d-inline-flex"
        role="group"
        aria-label="Basic example"
      >
        <button
          onClick={() => dateChangeHnalder(-1)}
          type="button"
          className="btn btn-tm"
        >
          Previous Day
        </button>
        <button
          onClick={() => dateChangeHnalder(1)}
          type="button"
          className="btn btn-tm"
        >
          Next Day
        </button>
        <button
          onClick={() => history.push(`/dashboard`)}
          type="button"
          className="btn btn-tm"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default Pagination;
