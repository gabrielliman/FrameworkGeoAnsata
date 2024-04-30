import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

function Registration() {
    const [registrationResponse, setRegistrationResponse] = useState([]);

    const initialValues={
        Username: "",
        Email:"",
        Password:""
    };

    const validationSchema = Yup.object().shape({
        Username: Yup.string().min(3).max(30).required(),
        Email: Yup.string().required(),
        Password: Yup.string().min(4).max(30).required(),
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/auth",data,{ withCredentials: true }).then((response) => {
            setRegistrationResponse(response.data)
        });
    };
  return (
    <div className="RegistrationPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Username </label>
                <ErrorMessage name="Username" element="span"/>
                <Field
                    id="usernameRegistration"
                    name="Username"
                    placeholder="Username"
                />
                <label> Email </label>
                <ErrorMessage name="Email" element="span"/>
                <Field
                    id="emailRegistration"
                    type="email"
                    name="Email"
                    placeholder="Email"
                />
                <label> Password </label>
                <ErrorMessage name="Password" element="span"/>
                <Field
                    id="passwordRegistration"
                    type="password"
                    name="Password"
                    placeholder="Password"
                />
                <button type="submit"> Register User</button>
            </Form>
        </Formik>
        {registrationResponse && (
            <div className="Response">
                    <p className='error'>{registrationResponse["error"]}</p>
                    <p className='confirmation'>{registrationResponse["confirmation"]}</p>
                </div>
            )}
    </div>
  );
}

export default Registration
