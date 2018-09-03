import React, { PureComponent } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const nom = [
  "Small Class",
  "Economy",
  "Compact",
  "Buisness",
  "Lux",
  "Coupe / Sport",
  "Electric / Hybrid",
  "Crossover",
  "SUV",
  "Design",
  "Price / Quality",
  "Best Crossover / SUV 2018",
  "Best Car 2018"
];

class Admin extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>this is madness</h1>
        {nom.forEach(name => {
          axios
            .post("/api/nominations", {
              name: name
            })
            .then(res => <p>{name + " " + res.data.success}</p>);
        })}
        <Button
          variant="raised"
          color="primary"
          size="small"
          style={{ width: "20%" }}
        >
          Toggle
        </Button>
      </React.Fragment>
    );
  }
}

// export default withStyles(styles)(Admin);
export default Admin;
