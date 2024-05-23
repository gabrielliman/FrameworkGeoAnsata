import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function CreateRequirement() {
    let { subsection_id } = useParams();
    let navigate = useNavigate();

    const initialValues={
        Title: "",
        OriginalText:"",
        SubSectionID: subsection_id
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().max(60).required(),
        OriginalText: Yup.string().required()
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/requirements",data,{ withCredentials: true }).then((response) => {
        });
        setTimeout(() => {
            navigate('/subsection/'+subsection_id)
        }, 500);
    };
  return (
    <div className="CreatePage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Título </label>
                <ErrorMessage name="Title" element="span"/>
                <Field
                    id="inputCreateRequirement"
                    name="Title"
                    placeholder="Título da Requisito"
                />
                <label> Texto Original </label>
                <ErrorMessage name="OriginalText" element="span"/>
                <Field
                    id="inputCreateRequirement"
                    name="Texto Original"
                    placeholder="Texto Original do Requisito"
                />
                <button type="submit"> Criar Requisito</button>
            </Form>
        </Formik>
    </div>
  );
}

export default CreateRequirement
