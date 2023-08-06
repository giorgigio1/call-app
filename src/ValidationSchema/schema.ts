import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required!").min(2),
  email: yup.string().required("Email is required!").email(),
  gender: yup.string().required("Gender is required!"),
  address: yup.object().shape({
    street: yup.string().required("Street is required!").min(2),
    city: yup.string().required("city is required!").min(2),
  }),
  phone: yup.string().required("Phone is required!").min(12),
});
