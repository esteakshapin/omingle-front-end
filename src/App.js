import "./assets/css/styles.css";
import GameRoom from "./pages/play/gameRoom/gameRoom";
import Header from './components/navbar';
import Footer from './components/footer';
import Dashboard from './pages/dashboard';
import Play from './pages/play/play';
import Friends from './pages/friends';
import School from './pages/school';
import CssBaseline from "@material-ui/core/CssBaseline";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {

  return (
    <Router >
      <div className="App">

        <CssBaseline />
        <Header />

        {
          <Switch>
            <Route exact path='/'>
              <Dashboard />
            </Route>
            <Route path='/play'>
              <Play />
            </Route>
            <Route path='/friends'>
              <Friends />
            </Route>
            <Route path='/school'>
              <School />
            </Route>
          </Switch>
        }

        <Footer />

      </div>
    </Router>
  );
}
