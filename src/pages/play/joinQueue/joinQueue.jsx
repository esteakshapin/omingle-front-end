import React from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 500
    },
    joinButton: {
        width: '100%',
        // backgroundColor: 'red',
        marginTop: theme.spacing(2),
        textAlign: 'center'
    }
}));

export default function JoinQueue() {
    const history = useHistory();

    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
        checkedE: true,
        checkedF: true,
        checkedG: true,
        checkedH: true
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const handleClick = (e) => {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/queue_up',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        })
            .then((res) => history.push('/play/queue'))
            .catch((error) => console.log(error));

        e.preventDefault();
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Interests</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="subtitle1">Topics</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs="2" />
                    <Grid item xs="8">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedA}
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedF}
                                        onChange={handleChange}
                                        name="checkedF"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedG}
                                        onChange={handleChange}
                                        name="checkedG"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedC}
                                        onChange={handleChange}
                                        name="checkedC"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedD}
                                        onChange={handleChange}
                                        name="checkedD"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedE}
                                        onChange={handleChange}
                                        name="checkedE"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedH}
                                        onChange={handleChange}
                                        name="checkedH"
                                        color="primary"
                                    />
                                }
                                label="Spanish"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid Container spacing={5}>
                    <Grid item xs="12">
                        <Paper elevation={0}> </Paper>
                    </Grid>
                </Grid>
                <div className={classes.joinButton}>
                    <Button variant="contained" color="primary" onClick={handleClick}>
                        Join Queue
                    </Button>
                </div>
            </Paper>
        </div>
    )
}