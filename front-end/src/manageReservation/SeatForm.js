import React from "react";

function SeatForm({ handleChange, handleSubmit, tables, history }) {
  const options = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
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
        className="mr-2 btn btn-can"
      >
        Cancel
      </button>
      <button type="submit" className="mr-2 btn btn-prm">
        Finish
      </button>
    </form>
  );
}

export default SeatForm;
