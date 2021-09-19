import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  /*const addHyphen = ({ target: { value } }) => {
    let val = value.val().split("-").join(""); // Remove dash (-) if mistakenly entered.
    console.log(val);
    let finalVal;
    if (val.length > 3 && val.length <= 6) {
      finalVal = val.slice(0, 3) + "-" + val.slice(3);
    } else if (val.length > 6) {
      finalVal = val.slice(0, 3) + "-" + val.slice(3, 6) + "-" + val.slice(6);
    }
    value.val(finalVal); // Update the input box.
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createReservation(formData);
    history.push(`/dashboard?date=${formData.reservation_date}`);
  };
  return (
    <main>
      <div>
        <h2>New Reservation</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              required
              name="mobile_number"
              type="tel"
              className="form-control"
              id="mobile_number"
              placeholder="xxx-xxx-xxxx"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handleFormChange}
              value={formData.mobile_number}
            />
            <small className="form-text text-muted">Format: xxx-xxx-xxxx</small>
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
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

export default NewReservation;
