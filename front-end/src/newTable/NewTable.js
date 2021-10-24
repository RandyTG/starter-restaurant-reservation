import React, { useState } from "react";
import { useHistory } from "react-router";
import NewTableForm from "./NewTableForm";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
  });

  const handleFormChange = ({ target: { name, value } }) => {
    if (name === "capacity") {
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
    event.preventDefault();
    await createTable(formData);
    history.push("/dashboard");
  };

  return (
    <main>
      <div>
        <h2>New Table</h2>
        <NewTableForm
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          formData={formData}
          history={history}
        />
      </div>
    </main>
  );
}

export default NewTable;
