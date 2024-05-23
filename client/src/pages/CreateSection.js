import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function CreateSection() {
    let { framework_id } = useParams();
    let navigate = useNavigate();

    const initialValues={
        Title: "",
        Description:"",
        FrameworkID: framework_id
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().max(60).required(),
        Description: Yup.string().required()
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/sections",data,{ withCredentials: true }).then((response) => {
        });
        setTimeout(() => {
            navigate('/framework/'+framework_id)
        }, 500);
    };
  return (
    <div className="CreatePage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Título </label>
                <ErrorMessage name="Title" element="span"/>
                <Field
                    id="inputCreateSection"
                    name="Title"
                    placeholder="Título da Seção"
                />
                <label> Descrição </label>
                <ErrorMessage name="Description" element="span"/>
                <Field
                    id="inputCreateSection"
                    name="Description"
                    placeholder="Descrição da Seção"
                />
                <button type="submit"> Criar Seção</button>
            </Form>
        </Formik>
    </div>
  );
}

export default CreateSection
