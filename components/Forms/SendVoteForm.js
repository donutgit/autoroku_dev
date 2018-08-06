import React, { Component } from "react";
import { v4 as generateRandomID } from "uuid/v4";
import { withFormik } from "formik";
import Yup from "yup";
import { dbStore } from "../../firebase/firebase";
//mui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./FormStyles.css";
import { DisplayFormikState } from "./helper";

// Our inner form component. Will be wrapped with Formik({..})
class MyInnerForm extends Component {
  state = {
    loading: false
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const userId = generateRandomID();
    const data = {
      [userId]: {
        vote_date: new Date(),
        user_data: this.props.values,
        vote_reslt: this.props.choosedCars
      }
    };

    dbStore
      .collection("poll")
      .doc("votes")
      .update(data)
      .then(res => {
        console.log("Your vote was accepted!");
        this.setState({ loading: false });
      })
      .catch(function(error) {
        console.error("Error in accepting vote: ", error);
      });
  };

  render() {
    const {
      values,
      touched,
      errors,
      //dirty,
      //isSubmitting,
      handleChange,
      handleBlur
      //handleReset
    } = this.props;

    let form = (
      <form
        onSubmit={this.submitFormHandler}
        className={this.state.loading ? classes.loading : null}
      >
        <TextField
          margin="normal"
          error={errors.name && touched.name ? true : false}
          id="name"
          label="Enter your name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.name && touched.name ? "Error" : null}
        />
        <TextField
          margin="normal"
          error={errors.email && touched.email ? true : false}
          id="email"
          label="Enter your email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.email && touched.email ? "Error" : null}
        />
        <TextField
          margin="normal"
          error={errors.phone && touched.phone ? true : false}
          id="phone"
          label="Enter your phone"
          type="number"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.phone && touched.phone ? "Error" : null}
        />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="raised"
            color="primary"
            onClick={this.props.voteReset}
          >
            Reset Vote
          </Button>
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={!this.props.isValid}
          >
            Submit
          </Button>
        </div>
        <DisplayFormikState {...this.props} />
      </form>
    );
    return (
      <div className={classes.formWrapper}>
        <h3 style={{textAlign: "center"}}>All steps completed! Submit form to finish vote</h3>
        {form}
        {this.state.loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} color="secondary" />
          </div>
        ) : null}
      </div>
    );
  }
}

const SendVoteForm = withFormik({
  mapPropsToValues: () => ({
    email: "email@gmail.com",
    name: "Dmitry",
    phone: "322322322322"
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    name: Yup.string()
      .min(5, "min 5 characters")
      .required("name is req"),
    phone: Yup.number()
      .min(9999999999, "min 11 char")
      .required("enter valid phone")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
})(MyInnerForm);

export default SendVoteForm;
