import React from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

export default function JoinQueue() {
    const history = useHistory();


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
        <div>
            Join Queue Page
            <button onClick={handleClick}>Join Queue</button>
        </div>
    )
}