import { object, string } from 'yup';

const userRegisterSchemaYup = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required(),
});

const userLoginSchemaYup = object({
    email: string().email().required(),
    password: string().required(),
});

export const validateUserRegister = async (data) => {
  try {
    const values = await userRegisterSchemaYup.validate(data, { abortEarly: false });
    return { values, errors: null };
  } catch (err) {
    const errors = {};
    err.inner?.forEach(e => (errors[e.path] = e.message));
    return { values: data, errors };
  }
};

export const validateUserLogin = async (data) => {
  try {
    const values = await userLoginSchemaYup.validate(data, { abortEarly: false });
    return { values, errors: null };
  } catch (err) {
    const errors = {};
    err.inner?.forEach(e => (errors[e.path] = e.message));
    return { values: data, errors };
  }
};

