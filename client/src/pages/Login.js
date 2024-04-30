import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

function Login() {
    const [loginResponse, setLoginResponse] = useState([]);
    const initialValues={
        Username: "",
        Password:""
    };

    const validationSchema = Yup.object().shape({
        Username: Yup.string().min(3).max(30).required(),
        Password: Yup.string().min(4).max(30).required(),
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/auth/login",data, { withCredentials: true }).then((response) => {
            setLoginResponse(response.data)
        });
    };
  return (
    <div className="LoginPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Username </label>
                <ErrorMessage name="Username" element="span"/>
                <Field
                    id="usernameLogin"
                    name="Username"
                    placeholder="Username"
                />
                <label> Password </label>
                <ErrorMessage name="Password" element="span"/>
                <Field
                    id="passwordLogin"
                    type="password"
                    name="Password"
                    placeholder="Password"
                />
                <button type="submit"> Login</button>
            </Form>
        </Formik>
        {loginResponse && (
            <div className="Response">
                    <p className='error'>{loginResponse["error"]}</p>
                    <p className='confirmation'>{loginResponse["confirmation"]}</p>
                </div>
            )}
    </div>
  );
}

export default Login
