import React, { PureComponent } from "react";
//mui
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//comp
import VoteCell from "./VoteCell";
import Spinner from "../../../UI/Spinner/Spinner";
//query
import { getVotes, deleteVote } from "../../../../queries";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class VoteList extends PureComponent {
  state = {
    votes: null,
    error: true
  };

  onInit = () => {
    getVotes().then(res => {
      if (res.data) {
        this.setState({ votes: res.data, error: false });
      } else {
        throw new Error("No such document - [votes].");
      }
    });
  };

  onDelete = id => {
    deleteVote(id).then(res => {
      this.onInit();
    });
  };

  componentWillMount() {
    this.onInit();
  }

  render() {
    const { votes, error } = this.state;
    const { classes } = this.props;

    return !error && votes ? (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes.map(vote => {
              return (
                <VoteCell key={vote._id} vote={vote} onDelete={this.onDelete} />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    ) : (
      <Spinner />
    );
  }
}

export default withStyles(styles)(VoteList);
