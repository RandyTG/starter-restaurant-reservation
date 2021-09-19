import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error }) {
  let messages;
  if (error) {
    messages = error.message.map((m) => <div> Error: {m}</div>);
  }
  return error && <div className="alert alert-danger m-2">{messages}</div>;
}

export default ErrorAlert;
