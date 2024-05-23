import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import {useNavigate } from "react-router-dom";


function CreateFramework() {
    
    let navigate = useNavigate();

    const initialValues={
        Title: "",
        Description:""
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().max(60).required(),
        Description: Yup.string().required()
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/frameworks",data,{ withCredentials: true }).then((response) => {
        });
        setTimeout(() => {
            navigate(`/`);
        }, 500); 
    };
  return (
    <div className="CreatePage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Título </label>
                <ErrorMessage name="Title" element="span"/>
                <Field
                    id="inputCreateFramework"
                    name="Title"
                    placeholder="Título do Framework"
                />
                <label> Descrição </label>
                <ErrorMessage name="Description" element="span"/>
                <Field
                    id="inputCreateFramework"
                    name="Description"
                    placeholder="Descrição do Framework"
                />
                <button type="submit"> Criar Framework</button>
            </Form>
        </Formik>
    </div>
  );
}

export default CreateFramework
