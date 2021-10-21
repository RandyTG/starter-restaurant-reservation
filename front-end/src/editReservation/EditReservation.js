import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "../utils/ReservationForm";

function EditReservation() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const { reservationId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal).then(setFormData);
    return () => abortController.abort();
  }, [reservationId]);

  const handleFormChange = ({ target: { name, value } }) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setErrorMessage(null);
    event.preventDefault();
    try {
      await updateReservation(reservationId, formData);
      history.push("/dashboard");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <main>
      <div>
        <h2>Edit Reservation</h2>
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

export default EditReservation;
