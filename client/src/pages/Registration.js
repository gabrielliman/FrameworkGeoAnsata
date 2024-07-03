import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

function Registration() {
  let navigate = useNavigate();
  const [registrationResponse, setRegistrationResponse] = useState([]);

  const initialValues = {
    Username: "",
    Email: "",
    Password: "",
  };

  const validationSchema = Yup.object().shape({
    Username: Yup.string().min(3).max(30).required(),
    Email: Yup.string().required(),
    Password: Yup.string().min(4).max(30).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data, { withCredentials: true })
      .then((response) => {
        setRegistrationResponse(response.data);
        if (response.data.confirmation) {
          setTimeout(() => {
            navigate("/login");
          }, 500); // Navigate after 2 seconds
        }
      });
  };
  
  return (
    <div className="RegistrationPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label> Username </label>
          <ErrorMessage name="Username" element="span" />
          <Field
            id="usernameRegistration"
            name="Username"
            placeholder="Username"
            autoFocus
            autoComplete="username" 
          />
          <label> Email </label>
          <ErrorMessage name="Email" element="span" />
          <Field
            id="emailRegistration"
            type="email"
            name="Email"
            placeholder="Email"
            autoComplete="email" 
          />
          <label> Password </label>
          <ErrorMessage name="Password" element="span" />
          <Field
            id="passwordRegistration"
            type="password"
            name="Password"
            placeholder="Password"
            autoComplete="new-password" 
          />
          <button type="submit"> Registrar Usuário</button>
        </Form>
      </Formik>
      {registrationResponse && (
        <div className="Response">
          {registrationResponse["error"] && (
            <div className="error">{registrationResponse["error"]}</div>
          )}
          {registrationResponse["confirmation"] && (
            <div className="confirmation">
              {registrationResponse["confirmation"]}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Registration;
