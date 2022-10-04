// import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from 'react-router-dom';
import Favorites from './Favorites';
import Home from './Home';
import NavBar from './NavBar'
import Welcome from './Welcome'
import ArtistInfo from './ArtistInfo';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/artist_info">
          <ArtistInfo />
        </Route>
        <Route exact path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
