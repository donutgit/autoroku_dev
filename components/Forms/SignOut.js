import React from "react";

import { auth } from "../../firebase";
import Button from "@material-ui/core/Button";

const SignOutButton = () => (
  <Button fullWidth={true} color="secondary" onClick={auth.doSignOut}>
    Sign Out
  </Button>
);

export default SignOutButton;
