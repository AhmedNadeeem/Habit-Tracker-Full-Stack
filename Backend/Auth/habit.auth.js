import { object, string } from "yup";

const habitYupSchema = object({
    userId: string().required(),
    title: string().required(),
    frequency: string().required(),
})

export const validateHabit = async (data) => {
  try {
    const values = await habitYupSchema.validate(data, { abortEarly: false });
    return { values, errors: null };
  } catch (err) {
    const errors = {};
    err.inner?.forEach(e => (errors[e.path] = e.message));
    return { values: data, errors };
  }
};