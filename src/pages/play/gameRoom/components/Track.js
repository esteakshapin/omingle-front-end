import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Track.css';

const useStyles = ((theme) => ({
    
}));

class Track extends Component {

    constructor(props) {
        super(props)
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (this.props.track !== null) {
            const child = this.props.track.attach();
            this.ref.current.classList.add(this.props.track.kind);
            child.classList.add("trackObject");
            this.ref.current.appendChild(child);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.track} ref={this.ref} />
        )
    }
}

export default withStyles(useStyles)(Track);
