import React, { Component } from "react";
// import { withStyles } from "@material-ui/core/styles";
import styles from "./Style.jsx";
// import styles from "./Style.css";
import IconButton from "@material-ui/core/IconButton";
// import { Delete, Edit, Close, Favorite, Check } from "@material-ui/icons";
// import Close from "@material-ui/icons/Close";
// import Edit from "@material-ui/icons/Edit";
// import Delete from "@material-ui/icons/Delete";
// import Favorite from "@material-ui/icons/Favorite";
import Check from "@material-ui/icons/Check";

class Admin extends Component {
  render() {
    // console.log(this.props.classes);
    const { classes } = this.props;
    return (
      <div>
        <h1>wat</h1>
        {/* <Typography className={classes.Title}>TITLE</Typography>
        <Typography classes={{ root: classes.Subtitle }}>SUBTITLE</Typography> */}
        {/* <IconButton aria-label="Close" color="primary">
          <Close />
        </IconButton>
        <IconButton aria-label="Close" color="primary">
          <Edit />
        </IconButton>
        <IconButton aria-label="Close" color="primary">
          <Delete />
        </IconButton>
        <IconButton aria-label="Close" color="primary">
          <Favorite />
        </IconButton> */}
        <IconButton aria-label="Close" color="primary">
          <Check />
        </IconButton>
      </div>
    );
  }
}

// export default withStyles(styles)(Admin);
export default Admin;
