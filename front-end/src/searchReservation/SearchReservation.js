import React, { useState } from "react";
import { useHistory } from "react-router";
import { searchReservation } from "../utils/api";
import Reservation from "../utils/Reservation";
import SearchForm from "./SearchForm";

function SearchReservation() {
  const [reservations, setReservations] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState({
    mobile_number: "",
  });
  const [notFound, setNotFound] = useState(false);
  const [componentReload, setComponentReload] = useState(false);
  const history = useHistory();

  const handleFormChange = ({ target: { name, value } }) => {
    setPhoneNumber((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    history.push(`/search?mobile_phone=${phoneNumber.mobile_number}`);
    searchReservation(phoneNumber.mobile_number, abortController.signal).then(
      (data) => {
        setReservations(data);
        setNotFound(!data.length);
      }
    );
  };

  return (
    <main>
      <div>
        <h2>Lookup Reservation</h2>
        <SearchForm
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          phoneNumber={phoneNumber}
        />
      </div>
      <div>
        {notFound
          ? "No reservations found"
          : reservations.map((data) => (
              <Reservation
                key={data.reservation_id}
                componentReload={componentReload}
                setComponentReload={setComponentReload}
                reservation={data}
                buttons={true}
              />
            ))}
      </div>
    </main>
  );
}

export default SearchReservation;
