import React from "react";
import Route from "react-router-dom/Route";
import withStyles from "@material-ui/core/styles/withStyles";

import ResponsiveDrawer from "../components/Navigation/ResponsiveDrawer/ResponsiveDrawer";
import Footer from "../components/Navigation/Footer/Footer";
import LayoutBg from "../assets/bg_l.png";

const style = {
  Layout: {
    marginTop: "52px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    flex: "1 0 auto"
  }
};
const Layout = ({ component: Component, noFooter, classes, ...props }) => {
  return (
    <Route
      {...props}
      render={matchProps => {
        return (
          <React.Fragment>
            <ResponsiveDrawer />
            <main
              className={classes.Layout}
              style={{ backgroundImage: `url(${LayoutBg})` }}
            >
              <Component {...matchProps} />
            </main>
            {noFooter || <Footer />}
          </React.Fragment>
        );
      }}
    />
  );
};

export default withStyles(style)(Layout);
