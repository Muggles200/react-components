import React from 'react';
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, PrimaryButton, IconButton } from '@fluentui/react';

interface FormValues {
  username: string;
  email: string;
  accessCodes: string[];
}

const initialValues: FormValues = {
  username: '',
  email: '',
  accessCodes: [''],
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  accessCodes: Yup.array().of(Yup.string().required('Access code is required')),
});

const AddUserForm: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form data', values);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          
          <div>
            <TextField
              label="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          
          <FieldArray name="accessCodes">
            {({ push, remove }) => (
              <div>
                <label>Access Codes</label>
                {values.accessCodes.map((code, index) => (
                  <div key={index}>
                    <TextField
                      name={`accessCodes[${index}]`}
                      value={code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      onClick={() => remove(index)}
                    />
                    <ErrorMessage name={`accessCodes[${index}]`} component="div" className="error" />
                  </div>
                ))}
                <PrimaryButton text="Add Access Code" onClick={() => push('')} />
              </div>
            )}
          </FieldArray>
          
          <PrimaryButton type="submit" text="Submit" />
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
