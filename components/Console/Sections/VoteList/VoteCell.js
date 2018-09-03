import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";

const VoteCell = ({ vote, onDelete }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {vote.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.email}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.phone}
      </TableCell>
      <TableCell component="th" scope="row">
        <Button
          size="small"
          variant="raised"
          color="secondary"
          onClick={() => onDelete(vote._id)}
        >
          Delete Vote
        </Button>
      </TableCell>
    </TableRow>
  );
};
export default VoteCell;
