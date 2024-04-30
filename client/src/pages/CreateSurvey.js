import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";

//provavelmente nao vou usar isso é so pra aprender initialValues={} onSubmit={} validationSchema={}
function CreateSurvey() {
    const initialValues={
        Title: "",
        Description:""
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().max(60).required(),
        Description: Yup.string().required()
    })

    const onSubmit = (data) =>{
        axios.post("http://localhost:3001/surveys",data,{ withCredentials: true }).then((response) => {
        console.log("It Worked");
        });
    };
  return (
    <div className="CreateSurveyPage">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className="formContainer">
                <label> Titúlo </label>
                <ErrorMessage name="Title" element="span"/>
                <Field
                    id="inputCreateSurvey"
                    name="Title"
                    placeholder="Título da Formulário"
                />
                <label> Descrição </label>
                <ErrorMessage name="Description" element="span"/>
                <Field
                    id="inputCreateSurvey"
                    name="Description"
                    placeholder="Descrição da Formulário"
                />
                <button type="submit"> Criar Formulário</button>
            </Form>
        </Formik>
    </div>
  );
}

export default CreateSurvey
