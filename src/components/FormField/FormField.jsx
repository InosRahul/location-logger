import { ErrorMessage, Field } from 'formik';

export const FormField = ({ identifier, label, type = 'text' }) => (
  <label>
    {label}
    <Field name={identifier} type={type}></Field>
    <ErrorMessage
      className="error"
      component="div"
      name={identifier}
    ></ErrorMessage>
  </label>
);
