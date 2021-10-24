import React from "react";

function ReservationForm({
  handleSubmit,
  handleFormChange,
  formData,
  history,
}) {
  const handlePhoneFormat = ({ target: { name, value } }) => {
    value = value.replace(/[^0-9]/g, "");

    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0, 3) + "-" + value.slice(3);
    } else if (value.length > 6) {
      value =
        value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
    }

    handleFormChange({ target: { name, value } });
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6 mb-2">
        <label htmlFor="first_name">First Name</label>
        <input
          required
          name="first_name"
          type="text"
          className="form-control"
          id="first_name"
          placeholder="First Name"
          onChange={handleFormChange}
          value={formData.first_name}
        />
      </div>
      <div className="col-md-6 mb-2">
        <label htmlFor="last_name">Last Name</label>
        <input
          required
          name="last_name"
          type="text"
          className="form-control"
          id="last_name"
          placeholder="Last Name"
          onChange={handleFormChange}
          value={formData.last_name}
        />
      </div>
      <div className="col-12 mb-2">
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          required
          name="mobile_number"
          type="tel"
          className="form-control"
          id="mobile_number"
          placeholder="xxx-xxx-xxxx"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          onChange={handlePhoneFormat}
          value={formData.mobile_number}
        />
        <small className="form-text text-muted">Format: xxx-xxx-xxxx</small>
      </div>
      <div className="col-md-6 mb-2">
        <label htmlFor="reservation_date">Date of Reservation</label>
        <input
          required
          name="reservation_date"
          type="date"
          className="form-control"
          id="reservation_date"
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleFormChange}
          value={formData.reservation_date}
        />
      </div>
      <div className="col-md-6 mb-2">
        <label htmlFor="reservation_time">Time of Reservation</label>
        <input
          required
          name="reservation_time"
          type="time"
          className="form-control"
          id="reservation_time"
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
          onChange={handleFormChange}
          value={formData.reservation_time}
        />
      </div>
      <div className="col-12 mb-2">
        <label htmlFor="people">Party Size</label>
        <input
          required
          name="people"
          type="number"
          min="1"
          className="form-control"
          id="people"
          placeholder="Number of people in party"
          onChange={handleFormChange}
          value={formData.people}
        />
        <small className="form-text text-muted">
          Enter a party of at least 1.
        </small>
      </div>
      <div className="col-12 mb-2">
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

export default ReservationForm;
