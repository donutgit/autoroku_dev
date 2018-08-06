import React from "react";
import { Route } from "react-router-dom";
import ResponsiveDrawer from "../components/Navigation/ResponsiveDrawer/ResponsiveDrawer";
import Footer from "../components/Navigation/Footer/Footer";

const styles = {
  backgroundImage: `url(${LayoutBg})`,
  marginTop: "52px",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  flex: "0 1 auto"
}

const RouteWithLayout = ({ component: Component, noFooter, ...props }) => {
  return (
    <Route
      {...props}
      render={matchProps => {
        return noFooter ? (
          <React.Fragment>
            <ResponsiveDrawer />
            <main
              className={classes.Layout}
              style={styles}
            >
              <Component {...matchProps} />
            </main>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ResponsiveDrawer />{" "}
            <main
              className={classes.Layout}
              style={{ backgroundImage: `url(${LayoutBg})` }}
            >
              <Component {...matchProps} />
            </main>
            <Footer />
          </React.Fragment>
        );
      }}
    />
  );
};

export default RouteWithLayout;
