import React from "react";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
//icons
import Close from "@material-ui/icons/Close";

import AddCarForm from "./AddCarFrom/AddCarForm";
import AuthUserContext from "../../hoc/AuthUserContext";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FullScreenDialog = props => {
  const { settings, classes, open, close } = props;
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {settings.type === "add"
              ? "Add new car"
              : `Edit ${settings.data.mark} ${settings.data.model}`}
          </Typography>
          <IconButton color="inherit" onClick={close} aria-label="Close">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AuthUserContext.Consumer>
        {({ userProfile }) => (
          <AddCarForm
            role={userProfile.role}
            formData={settings.data}
            type={settings.type}
            close={close}
          />
        )}
      </AuthUserContext.Consumer>
    </Dialog>
  );
};

export default withStyles(styles)(FullScreenDialog);
