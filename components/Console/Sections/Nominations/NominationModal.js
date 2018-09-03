import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class NominationModal extends React.Component {
  state = {
    nomination: ""
  };

  componentDidMount() {
    if (this.props.type === "update" && this.props.nomination) {
      this.setState({
        nomination: this.props.nomination
      });
    }
  }

  handleChange = event => {
    this.setState({
      nomination: event.target.value
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { nomination } = this.state;
    const { modalData } = this.props;

    if (modalData.type === "add") {
      modalData.onAdd({ nomination: nomination });
    } else if (modalData.type === "update") {
      modalData.onUpdate(modalData.nominationId, { nomination: nomination });
    }
  };

  render() {
    // console.log("[MODAL]", this.state);
    const { classes, modalData } = this.props;
    const { nomination } = this.state;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.close}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            {modalData.modalMessage}
          </Typography>
          <form onSubmit={event => this.onFormSubmit(event)}>
            <TextField
              margin="normal"
              fullWidth
              id="nomination"
              label="Enter nomination"
              type="text"
              onChange={this.handleChange}
              value={nomination}
            />
            <Button
              variant="raised"
              color="primary"
              type="submit"
              disabled={nomination ? false : true}
              fullWidth
            >
              {modalData.buttonMessage}
            </Button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(NominationModal);
