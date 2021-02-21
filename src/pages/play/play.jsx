import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import JoinQueue from './joinQueue/joinQueue';
import Queue from './queue/queue';
import Lobby from './lobby/lobby';
import GameRoom from './gameRoom/gameRoom';


export default function Play() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.path}/`}>
                <JoinQueue />
            </Route>
            <Route path={`${match.path}/queue`}>
                <Queue />
            </Route>
            <Route path={`${match.path}/lobby`}>
                <Lobby />
            </Route>
            <Route path={`${match.path}/gameRoom`}>
                <GameRoom />
            </Route>

        </Switch>
    )
}