import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersWaiting: 0,
            intervalId: '',
            userId: null
        }
        this.checkTeam = this.checkTeam.bind(this);
    }

    checkTeam() {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/team/get_team/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        }).then((res) => {
            if (res.data.team.length > 0) {
                this.props.history.push('lobby')
            }
            else if (!res.data.queryroom.players_waiting.includes(this.state.userId)) {
                alert('You need to join the queue!');
                this.props.history.push('/play/')
            } else {
                this.setState({
                    playersWaiting: res.data.queryroom.players_waiting.length
                })
            }
        })
    }

    async componentDidMount() {
        await axios({
            method: 'GET',
            url: 'http://localhost:8000/rest-auth/user/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        })
            .then((res) => this.setState({ userId: res.data.id }))
            .catch(error => console.log(error));

        try {
            this.checkTeam();
            let intervalId = setInterval(() => {
                this.checkTeam();
            }, 5000)

            this.setState({ intervalId: intervalId });

        } catch (e) {
            console.log('error');
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <div>
                Queue Page
                <h1>{this.state.playersWaiting}</h1>
            </div>
        )
    }
}

export default withRouter(Queue);