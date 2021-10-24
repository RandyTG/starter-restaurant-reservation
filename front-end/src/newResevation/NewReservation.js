import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../utils/ReservationForm";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
    status: "booked",
  });

  const handleFormChange = ({ target: { name, value } }) => {
    if (name === "people") {
      setFormData((previousFormData) => ({
        ...previousFormData,
        [name]: Number(value),
      }));
    } else {
      setFormData((previousFormData) => ({
        ...previousFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    setErrorMessage(null);
    event.preventDefault();
    try {
      await createReservation(formData);
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <main>
      <div>
        <h2>New Reservation</h2>
        <ErrorAlert error={errorMessage} />
        <ReservationForm
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          formData={formData}
          history={history}
        />
      </div>
    </main>
  );
}

export default NewReservation;
