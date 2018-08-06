import React from "react";

const VotePageControlls = props => (
  <div className={classes.controls}>
    <div className={classes.controlButtons}>
      <Button
        disabled={activeStep === 0 || this.allStepsCompleted()}
        color="inherit"
        onClick={this.handleBack}
      >
        <ArrowBack style={{ fontSize: 42 }} />
      </Button>
      {activeStep !== steps.length && (
        <div className={classes.choosedCar}>
          {!this.allStepsCompleted() ? (
            <React.Fragment>
              <span className={classes.textEllipsis}>{steps[activeStep]}</span>
              <span
                className={classes.textEllipsis}
                style={{ fontSize: 10, color: "#c72323" }}
              >
                {this.state.choosedCars[steps[activeStep]] || "Choose Car"}
              </span>
            </React.Fragment>
          ) : (
            <span>Submit Form</span>
          )}
        </div>
      )}
      <Button
        disabled={this.allStepsCompleted()}
        color="inherit"
        onClick={this.handleNext}
      >
        <ArrowForward style={{ fontSize: 42 }} />
      </Button>
      <Button color="inherit" onClick={this.handleComplete}>
        <Flag style={{ fontSize: 42 }} />
      </Button>
    </div>
    <LinearProgress
      variant="determinate"
      value={this.state.progress}
      style={{ border: "1px solid" }}
    />
  </div>
);

export default VotePageControlls;
