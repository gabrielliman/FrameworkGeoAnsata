import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useParams } from 'react-router-dom';

function CreateInstance() {
    let { framework_id } = useParams();
    const initialValues = {
        Title: "",
        Description: "",
        Class: "",
        FrameworkID: framework_id
    };

    const validationSchema = Yup.object().shape({
        Title: Yup.string().max(60).required(),
        Description: Yup.string().required(),
        Class: Yup.string().required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/instance", data, { withCredentials: true })
            .then((response) => {
                // Optionally, you can redirect the user to another page after successful submission
            })
            .catch((error) => {
                // Optionally, handle errors, show error message, etc.
            });
    };

    return (
        <div className="CreateInstancePage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label htmlFor="inputCreateTitle">Título</label>
                    <ErrorMessage name="Title" component="div" className="error" />
                    <Field
                        id="inputCreateTitle"
                        name="Title"
                        placeholder="Título da Instância"
                    />
                    <label htmlFor="inputCreateDescription">Descrição</label>
                    <ErrorMessage name="Description" component="div" className="error" />
                    <Field
                        id="inputCreateDescription"
                        name="Description"
                        placeholder="Descrição da Instância"
                    />
                    <label htmlFor="selectCreateClass">Classe</label>
                    <ErrorMessage name="Class" component="div" className="error" />
                    <Field as="select" id="selectCreateClass" name="Class" placeholder="Selecione a classe">
                        <option value="">Selecione a classe</option>
                        <option value="Resource">Recurso</option>
                        <option value="Reserve">Reserva</option>
                        <option value="Exploration">Exploração</option>
                    </Field>
                    {/* Hidden field for FrameworkID */}
                    <Field type="hidden" name="FrameworkID" />
                    <button type="submit">Criar Instância</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateInstance;
