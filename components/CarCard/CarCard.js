import React, { PureComponent } from "react";
import NavLink from "react-router-dom/NavLink";
import Transition from "react-transition-group/Transition";
import { dbStore, deleteField } from "../../firebase/firebase";
//mui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Favorite from "@material-ui/icons/Favorite";
import Check from "@material-ui/icons/Check";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
// import ProgressiveImage from "react-progressive-bg-image";
// import ProgressiveImage from "react-progressive-image-loading";
import Social from "../Social/Social";
import CarCardStyles from "./CarCardStyles";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 }
};
class SimpleMediaCard extends PureComponent {
  state = {
    overlay: false
  };
  deleteCarFromBase = id => {
    if (this.props.user && this.props.user.role === "GODMODE") {
      var confirmAction = window.top.confirm("u sure?");
      if (confirmAction) {
        dbStore
          .collection("poll")
          .doc("cars")
          .update({
            [id]: deleteField
          })
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error deleting field: ", error);
          });
      }
    } else alert("Access denied");
  };

  render() {
    const { id, mark, model, imageUrl } = this.props.car;
    const { page, classes, step, selected } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Card
          className={[
            classes.card,
            classes.DefaultCard,
            selected ? classes.ActiveCard : null
          ].join(" ")}
        >
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title="Contemplative Reptile"
          />
          {/* <ProgressiveImage
            src={imageUrl}
            placeholder="https://firebasestorage.googleapis.com/v0/b/react-burger-99366.appspot.com/o/images%2Fplaceholder.png?alt=media&token=3d5405fe-a780-4224-b79a-d568c4fc5563"
            style={{
              height: 200,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          /> */}

          {/* <ProgressiveImage
            preview="https://firebasestorage.googleapis.com/v0/b/react-burger-99366.appspot.com/o/images%2Fplaceholder.png?alt=media&token=3d5405fe-a780-4224-b79a-d568c4fc5563"
            src={imageUrl}
            transitionTime={400}
            render={(src, style) => (
              <div
                style={Object.assign(style, {
                  backgroundImage: `url(${src})`,
                  height: 200,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                })}
              />
            )}
          /> */}
          <div className={classes.Checked}>
            <Check
              size={12}
              style={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </div>
          <CardContent>
            <Typography variant="headline" component="h2">
              {mark + " " + model}
            </Typography>
            <Typography variant="body1">
              {this.props.car.votes ? this.props.car.votes : 0}
            </Typography>
          </CardContent>
          <Transition
            in={this.state.overlay}
            exit={true}
            appear={true}
            timeout={{
              enter: 200,
              exit: 500
            }}
          >
            {state => {
              if (state === "exited") {
                return null;
              }
              return (
                <div
                  className={classes.OverlayWrap}
                  style={{
                    transition: `opacity 300ms ease-in-out`,
                    opacity: 0,
                    ...transitionStyles[state]
                  }}
                >
                  <Social />
                  <IconButton
                    classes={{ root: classes.closeButton }}
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.setState({ overlay: false })}
                  >
                    <Close />
                  </IconButton>
                </div>
              );
            }}
          </Transition>
          <CardActions>
            <div className={classes.buttonsContainer}>
              <div>
                <Button
                  variant="raised"
                  disabled={page === "EditCars" || selected ? true : false}
                  size="small"
                  color="primary"
                  className={classes.voteButtons}
                  onClick={() => this.props.handleComplete(mark, model, step)}
                >
                  Vote
                </Button>

                <Button
                  variant="raised"
                  color="primary"
                  size="small"
                  component={NavLink}
                  to={`/cars/${id}`}
                  exact
                >
                  Info
                </Button>
              </div>
              <div>
                <IconButton
                  aria-label="Like"
                  color="primary"
                  onClick={() => this.setState({ overlay: true })}
                >
                  <Favorite />
                </IconButton>
                {page === "EditCars" ? (
                  <React.Fragment>
                    <IconButton
                      aria-label="Edit"
                      disabled={page !== "EditCars"}
                      onClick={() =>
                        this.props.openCarDialog("edit", this.props.car)
                      }
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.deleteCarFromBase(id)}
                      color="secondary"
                    >
                      <Delete />
                    </IconButton>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(CarCardStyles)(SimpleMediaCard);
