import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
    Card,
    CardContent
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    paddingTop: "2rem",
  },
}));

function createData(schoolName, points) {
  return { schoolName, points };
}

const rows = [
  createData("Stuyvesant High School", 5000),
  createData("Stuyvesant High School", 5000),
  createData("Stuyvesant High School", 5000),
  createData("Stuyvesant High School", 5000),
  createData("Stuyvesant High School", 5000),
];

export default function Dashboard() {
  const classes = useStyles();
  let leaderboardUsers = ["Sett", "Ivern", "Fizz", "Caitlyn", "Leona"];

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10} className={classes.content}>
          <TableContainer component={Paper}>
            <Typography style={{ padding: "8px 0 0 8px" }}>
              Top Schools
            </Typography>
            <Table
              className={classes.table}
              size={"small"}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>School</TableCell>
                  <TableCell align="right">Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.schoolName}>
                    <TableCell component="th" scope="row">
                      {row.schoolName}
                    </TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10} className={classes.content}>
          <Grid container>
            <Grid item xs={5}>
            <Paper>
              <Typography style={{ padding: "8px 0 0 8px" }}>
                Top Players
              </Typography>
              <List>
                {leaderboardUsers.map((user) => {
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{user.charAt(0).toUpperCase()}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user}
                        secondary={"Stuyvesant High School"}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={7} style={{"padding-left": "3rem"}}>
            <Typography style={{ padding: "8px 0 0 8px" }}>
                Top Teams
              </Typography>
            <Grid container>
              <Grid item xs={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      1st
                    </Typography>
                    <Typography variant="h5" component="h2">
                      team1
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      2nd
                    </Typography>
                    <Typography variant="h5" component="h2">
                      team2
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      3rd
                    </Typography>
                    <Typography variant="h5" component="h2">
                      team3
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}
