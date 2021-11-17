import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { firebaseService } from 'service';
import { validationSchema, defaultValues } from 'components/Login/loginConfig';
import { FormField } from 'components/FormField/FormField';

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const login = ({ email, password }, { setSubmitting }) => {
    firebaseService.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError('Trouble logging you in!');
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Invalid Password');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('Account does not exist');
        } else {
          setServerError('Something went wrong!');
        }
      })
      .finally(() => setSubmitting(false));
  };
  return (
    <div className="auth-form">
      <h1>Login Form</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={defaultValues}
      >
        {({ isValid, isSubmitting, setValues }) => (
          <Form>
            <FormField
              identifier="email"
              label="E-Mail"
              type="email"
            ></FormField>
            <FormField
              identifier="password"
              label="Password"
              type="password"
            ></FormField>
            <div className="auth-link-container">
              New User?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
                Sign Up !
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              {' '}
              Log in
            </button>
            <button
              className="guest-btn"
              type="submit"
              onClick={() =>
                setValues({ email: 'guest@guest.com', password: 'guestpass' })
              }
            >
              {' '}
              Log in as Guest User
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
