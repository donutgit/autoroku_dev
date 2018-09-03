import React from "react";
//mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
//components
import CarInfo from "../../components/CarLanding/CarLanding";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./CarLandingPage.css";
//query
import { getCarById } from "../../queries";

class CarLandingPage extends React.Component {
  state = {
    car: null
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    getCarById(id).then(res => this.setState({ car: res.data }));
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.Root}>
            <div className={classes.Wrapper}>
              {this.state.car ? <CarInfo car={this.state.car} /> : <Spinner />}
              <Button
                variant="raised"
                size="small"
                color="primary"
                onClick={this.props.history.goBack}
                style={{ marginTop: "auto", bottom: "10px" }}
              >
                Back
              </Button>
            </div>
          </section>
        </Grid>
      </Grid>
    );
  }
}

export default CarLandingPage;
