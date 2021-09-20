import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createTable(formData);
    history.push("/dashboard");
  };

  return (
    <main>
      <div>
        <h2>New Table</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <button
            onClick={() => history.goBack()}
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

export default NewTable;
