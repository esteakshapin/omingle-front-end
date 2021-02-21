import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import UserCard from './userCard';


const queryString = require('query-string');

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            rivals: [],
            userId: null,
            userAccessToken: '',
            room: null
        }
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getTeam = this.getTeam.bind(this);
        this.handlePlayers = this.handlePlayers.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    async getUser(id) {
        const user = await axios({
            method: 'GET',
            url: `http://localhost:8000/users/${id}/`,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        });
        return user;
    }

    async getCurrentUser() {
        const user = await axios({
            method: 'GET',
            url: `http://localhost:8000/rest-auth/user/`,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        });
        return user;
    }

    async getTeam() {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:8000/team/get_team/',
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,

            },
        });
        return res;
    }

    async handlePlayers(res) {
        const team = res.data.team[0].users;
        const opponents = res.data.opponents[0].users;

        const user1 = await this.getUser(team[0]);
        this.setState((state) => ({
            players: [...state.players, user1.data]
        }), () => { console.log(this.state) })

        const user2 = await this.getUser(team[1]);
        this.setState((state) => ({
            players: [...state.players, user2.data]
        }), () => { console.log(this.state) })

        console.log('res');
        console.log(res);
        console.log(user1.id)
        if (user1.data.id == this.state.userId) {
            this.setState({
                userAccessToken: res.data.team[0].access_token1
            })
        } else {
            this.setState({
                userAccessToken: res.data.team[0].access_token2
            })
        }

        opponents.forEach(element => {
            this.getUser(element).then(
                (user) => {
                    console.log(user.data);
                    this.setState((state) => ({
                        rivals: [...state.rivals, user.data]
                    }), () => {
                        console.log('foreach update');
                        console.log(this.state);
                    })
                }
            )
        });
    }

    joinRoom() {

        const parsed = {}
        parsed.accessToken = this.state.userAccessToken;

        const stringified = queryString.stringify(parsed).replace('b%27', '').replace('%27', '');

        console.log('etf')
        console.log(stringified.replace('b%27', ''))
        this.props.history.push(`/play/gameRoom?${stringified}`);
    }

    async componentDidMount() {
        // get user
        const user = await this.getCurrentUser()
        this.setState({
            userId: user.data.id
        }, async () => {
            const res = await this.getTeam();

            if (res.data.team.length > 0) {
                this.handlePlayers(res);
            }
            else if (!res.data.queryroom.players_waiting.includes(this.state.userId)) {
                alert('You need to join the queue!');
                this.props.history.push('/play/')
            }
            else {
                alert('You need to join the queue!');
                this.props.history.push('/play/')
            }
        });


    }

    render() {
        return (
            <div style={{ padding: '10px' }}>
                <h2>
                    Lobby Page
                </h2>

                <center><h3>Your Team</h3></center>
                <center>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.state.players.map((item, index) => {
                            return <UserCard key={item + index} firstName={item.first_name} lastName={item.last_name} localUser={item.id == this.state.userId} />
                        })}
                    </div>
                </center>


                <center>
                    <h3>Opponents</h3>
                </center>

                <center>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.state.rivals.map((item, index) => {
                            return <UserCard key={item + index} firstName={item.first_name} lastName={item.last_name} localUser={item.id == this.state.userId} />
                        })}
                    </div>
                </center>
                <center>
                    <Button variant="contained" color="primary" onClick={this.joinRoom}>
                        {" "}
                        Join Room
                     </Button>
                </center>
            </div>
        )
    }
}

export default withRouter(Lobby);
