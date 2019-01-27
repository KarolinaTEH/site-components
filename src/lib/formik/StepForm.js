import React from 'react';
import TextInput from './TextInput';
import FormButton from './FormButton';
import withFormik, { filterFields } from './formik';

import { MyTypography as Typography } from '../components';

import FormSuccess from './FormSuccess';

import { event } from '../services'; 

/*
dirty : false
errors : {}
handleBlur : ƒ (e)
handleChange : ƒ (e)
handleReset : ƒ ()
handleSubmit : ƒ (e)
initialValues : {}
isSubmitting : true
isValid : false
locale : "pl"
resetForm : ƒ (nextValues)
setError : ƒ (error)
setErrors : ƒ (errors)
setFieldError : ƒ (field, message)
setFieldTouched : ƒ (field, touched, shouldValidate)
setFieldValue : ƒ (field, value, shouldValidate)
setFormikState : ƒ (s, callback)
setStatus : ƒ (status)
setSubmitting : ƒ (isSubmitting)
setTouched : ƒ (touched)
setValues : ƒ (values)
submitForm : ƒ ()
touched : {}
translate : ƒ ()
user : {}
validateForm : ƒ (values)
validateOnBlur : true
validateOnChange : true
values : {}
*/

const StepForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    status,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
    success,
    fields,
    start
  } = props;

  const started = Object.keys(touched).length;


  if (started) {

    //handle GA event
    event({
      action : "registration_start", 
      category : "visitors", 
      label : "method",
      value : ""
    });

  }

  if (status && status === 'ok') {

    //handle GA event
    event({
        action : "registration_success", 
        category : "visitors", 
        label : "method",
        value : ""
    });

    return <FormSuccess />;
  }

  const filteredFields = filterFields(fields, start);

  return (
    <form onSubmit={handleSubmit}>
      <Typography template="legend" label="visitors.form.intro" />

      {start ? start.map((name, idx) => (
            <TextInput
              key={idx}
              id={name}
              label={`visitors.fields.${name}`}
              {...props}
            />
          ))
        : null}

      {(started || !start) && filteredFields.length
        ? filteredFields.map((name, idx) => (
            <TextInput
              key={idx}
              id={name}
              label={`visitors.fields.${name}`}
              {...props}
            />
          ))
        : null}

      <FormButton label="visitors.form.register" {...props} />
    </form>
  );
};

StepForm.defaultProps = {
  api: "https://api.eventjuicer.com/v1/public/hosts/ecommerceberlin.com/register",
  template : 'ecommerceberlin-visitor-registration',
  ticketId : 0
};

export default withFormik(StepForm);
