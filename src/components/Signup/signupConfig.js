import * as Yup from 'yup';

export const defaultValues = {
  email: '',
  password: '',
  verifyPassword: '',
  userName: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required(),
  password: Yup.string()
    .required('Required')
    .min(8, 'Must be atleast 8 characters')
    .max(15, 'Cannot be more than 15 characters'),
  verifyPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  userName: Yup.string()
    .required('Required')
    .min(4, 'Must be atleast 4 character')
    .max(12, 'Cannot be more than 12 characters')
    .matches(/^\S*$/, 'No spaces'),
});
