import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: theme.spacing(3),
            width: theme.spacing(20),
            height: theme.spacing(20)
        }
    },
    main: {
        borderRadius: "10px",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-around"
    },
    large: {
        margin: "auto",
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    avatardiv: {
        width: "100%",
        textAlign: "center",

        // flex: "1 1 auto",
    },
    name: {
        width: "100%",
        textAlign: "center",

        // flex: "1 1 auto",
    },
    addFriend: {
        width: "100%",
        textAlign: "center",
        // flex: "1 1 auto",
    },

}));

export default function UserCard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.main}>
                <div className={classes.avatardiv}>
                    <Avatar className={classes.large}></Avatar>
                </div>
                <div className={classes.name}>
                    <Typography>{props.firstName + ' ' + props.lastName}</Typography>
                </div>
                <div className={classes.addFriend}>
                    <Button variant="contained" color="secondary" disabled={props.localUser}>
                        {" "}
                        Add Friend
                     </Button>
                </div>


            </Paper>
        </div>
    );
}