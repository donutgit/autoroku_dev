import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const VoteCell = ({ vote }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {vote.user_data.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.user_data.email}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.user_data.phone}
      </TableCell>
    </TableRow>
  );
};
export default VoteCell;
