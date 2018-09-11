import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { HeaderUnderline } from "../../../styles/MainPage.css";

import PartnersLogo1 from "../../../assets/partners/partners-01.png";
import PartnersLogo2 from "../../../assets/partners/partners-02.png";
import PartnersLogo3 from "../../../assets/partners/partners-03.png";
import PartnersLogo4 from "../../../assets/partners/partners-04.png";
import PartnersLogo5 from "../../../assets/partners/partners-05.png";

const styles = {
  PartnersWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "center",
    padding: '20px 0'
  }
};

const Partners = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="display1" align="left" className={HeaderUnderline}>
        OUR PARTNERS
      </Typography>
      <div className={classes.PartnersWrap}>
        <img src={PartnersLogo1} alt="Partner-1" />
        <img src={PartnersLogo2} alt="Partner-2" />
        <img src={PartnersLogo3} alt="Partner-3" />
        <img src={PartnersLogo4} alt="Partner-4" />
        <img src={PartnersLogo5} alt="Partner-5" />
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles)(Partners);
