import { useState } from 'react';
import { Form, Formik } from 'formik';
import { validationSchema, defaultValues } from './signupConfig';
import { FormField } from 'components';
import { useHistory } from 'react-router-dom';
import { firebaseService } from 'service';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  const signup = ({ email, userName, password }, { setSubmitting }) => {
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          firebaseService.firestore
            .collection('users')
            .doc(res.user.uid)
            .set({ userName });
        } else {
          setServerError('Trouble signing you up. Please try again');
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('Account already exists with this email');
        } else {
          setServerError('Trouble signing you up. Please try again');
        }
      })
      .finally(() => setSubmitting(false));
  };
  return (
    <div className="auth-form">
      <h1>Signup form</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={defaultValues}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField identifier="userName" label="UserName"></FormField>
            <FormField
              identifier="email"
              label="Email"
              type="email"
            ></FormField>
            <FormField
              identifier="password"
              label="Password"
              type="password"
            ></FormField>
            <FormField
              identifier="verifyPassword"
              label="Verfiy Password"
              type="password"
            ></FormField>
            <div className="auth-link-container">
              Existing User?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log in !
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
