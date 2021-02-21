import React from 'react';
import axios from 'axios';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersWaiting: 0,
            intervalId: '',
            userId: null
        }
    }

    async componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost:8000/rest-auth/user/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        })
            .then((res) => this.setState({ userId: res.data.id }))
            .catch(error => console.log(error));

        try {
            let intervalId = setInterval(() => {
                axios({
                    method: 'GET',
                    url: 'http://localhost:8000/team/get_team/',
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('token')}`,

                    },
                }).then((res) => {
                    if (!res.data.queryroom.players_waiting.includes(this.state.userId)) {
                        alert('You need to join the queue!');

                    }
                    console.log(res)
                })
            }, 10000)

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
            </div>
        )
    }
}

export default Queue;