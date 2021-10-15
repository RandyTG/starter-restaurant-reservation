import React from "react";

function NewTableForm({ handleFormChange, handleSubmit, formData, history }) {
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="table_name">Table Name</label>
        <input
          required
          name="table_name"
          type="text"
          className="form-control"
          id="table_name"
          minLength="2"
          placeholder="Table Name"
          onChange={handleFormChange}
          value={formData.table_name}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="capacity">Capacity</label>
        <input
          required
          name="capacity"
          type="number"
          min="1"
          className="form-control"
          id="capacity"
          placeholder="Capacity of table"
          onChange={handleFormChange}
          value={formData.capacity}
        />
        <small className="form-text text-muted">
          Enter a capacity of at least 1.
        </small>
      </div>
      <div className="col-12">
        <button onClick={() => history.goBack()} className="mr-2 btn btn-can">
          Cancel
        </button>
        <button type="submit" className="mr-2 btn btn-prm">
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewTableForm;
