import React from "react";

function SearchForm({ handleSubmit, handleFormChange, phoneNumber }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="input-group">
          <input
            type="tel"
            name="mobile_number"
            className="form-control"
            placeholder="Enter a customer's phone number"
            aria-label="mobile_number"
            aria-describedby="button-addon2"
            onChange={handleFormChange}
            value={phoneNumber.mobile_number}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Find
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
