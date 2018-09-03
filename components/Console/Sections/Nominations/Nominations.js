import React, { Component } from "react";
import {
  getInitialData,
  addNomination,
  deleteNomination,
  updateNomination
} from "../../../../queries";
//mui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Expantion from "./Expantion";
import NominationModal from "./NominationModal";
import Spinner from "../../../UI/Spinner/Spinner";
//styles
import styles from "./NominationsTable.jsx";
function createData(id, nomination, carsAmount, cars) {
  return { id, nomination, carsAmount, cars };
}
class Nominations extends Component {
  state = {
    nominations: [],
    poll: {},
    modalData: {
      modalMessage: "",
      buttonMessage: "",
      type: "",
      onAdd: null,
      onUpdate: null
    },
    open: false,
    error: true
  };

  onInit = () => {
    getInitialData().then(data => {
      if (data) {
        this.setState({
          nominations: data.nominations,
          poll: data.poll,
          error: false
        });
      }
    });
  };

  onAdd = data => {
    addNomination(data).then(res => {
      if (res.status === 200) {
        this.onInit();
        this.handleClose();
        // this.setState({ success: true });
      }
    });
  };
  onDelete = id => {
    deleteNomination(id).then(res => {
      if (res.status === 200) {
        this.onInit();
      }
    });
  };
  onUpdate = (id, data) => {
    updateNomination(id, data).then(res => {
      if (res.status === 200) {
        this.onInit();
        this.handleClose();
      }
    });
  };
  handleOpen = (type, id) => {
    this.setState({
      open: true,
      modalData: {
        type: type,
        modalMessage: `${type === "add" ? "Add new" : "Update"} nomination`,
        buttonMessage: type === "add" ? "Add" : "Update",
        onAdd: this.onAdd,
        onUpdate: this.onUpdate,
        nominationId: id ? id : null
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.onInit();
  }
  render() {
    const { nominations, poll, error } = this.state;
    const { classes } = this.props;
    let data = [];
    if (!error) {
      data = nominations.map(item => {
        const { nomination, _id } = item;
        return createData(
          _id,
          nomination,
          poll[nomination].length,
          poll[nomination]
        );
      });
    }
    return !error ? (
      <div className={classes.root}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeaderCol}>
            <p>Nominations</p>
          </div>
          <div className={classes.tableHeaderCol}>
            <p>Cars</p>
          </div>
        </div>
        {data.map(d => {
          return (
            <Expantion
              key={d.id}
              data={d}
              onModal={this.handleOpen}
              onDelete={this.onDelete}
            />
          );
        })}
        <div className={classes.addNewNom}>
          <Button
            variant="raised"
            color="primary"
            onClick={() => this.handleOpen("add")}
          >
            Add new nomination
            <AddIcon className={classes.rightIcon} />
          </Button>
        </div>
        <NominationModal
          open={this.state.open}
          close={this.handleClose}
          modalData={this.state.modalData}
        />
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default withStyles(styles)(Nominations);
