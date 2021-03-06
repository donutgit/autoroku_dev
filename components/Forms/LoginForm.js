import React from "react";
import Link from "react-router-dom/Link";
import { withFormik } from "formik";
import Yup from "yup";
//mui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { withStyles } from "@material-ui/core/styles";
import classes from "./FormStyles.css";

// Our inner form component. Will be wrapped with Formik({..})
const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    //dirty,
    //isSubmitting,
    handleChange,
    handleBlur
    //handleSubmit
    //handleReset
  } = props;
  const { email, password } = props.values;
  let form = (
    <form
      onSubmit={event => props.onSubmit(event, email, password)}
      className={props.loading ? classes.loading : null}
    >
      <TextField
        margin="normal"
        error={errors.email && touched.email ? true : false}
        id="email"
        label="Enter your email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={errors.email && touched.email ? errors.email : null}
      />
      <TextField
        margin="normal"
        error={errors.password && touched.password ? true : false}
        id="password"
        label="Password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          errors.password && touched.password ? errors.password : null
        }
      />
      <Button
        variant="raised"
        color="primary"
        type="submit"
        disabled={!props.isValid}
        fullWidth
      >
        Login
      </Button>
      <Typography variant="caption">
        Don't have an account? <Link to="/join">Sign Up</Link>
      </Typography>
    </form>
  );
  return (
    <div>
      {form}
      {props.loading ? (
        <div className={classes.loadingWrapper}>
          <CircularProgress size={50} color="secondary" />
        </div>
      ) : null}
    </div>
  );
};

const JoinForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("You can't leave this empty."),
    password: Yup.string()
      .min(8, "Your password must be at least 8 characters long")
      .required("You can't leave this empty.")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
})(MyInnerForm);

export default JoinForm;
