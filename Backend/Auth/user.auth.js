import { object, string, number, date, InferType } from 'yup';

const userSchemaYup = object({
    username: string().trim.required(),
    email: string().email().required(),
    password: string().required(),
})

export const validateHabit = async (data) => {
  try {
    const values = await userSchemaYup.validate(data, { abortEarly: false });
    return { values, errors: {} };
  } catch (err) {
    const errors = {};
    err.inner?.forEach(e => (errors[e.path] = e.message));
    return { values: data, errors };
  }
};