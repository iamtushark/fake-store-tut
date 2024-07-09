import * as yup from "yup";

const LoginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(6, "Username must be at least 6 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default LoginFormSchema;
