import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import VideoDetails from "./pages/VideoDetails";
import VideoListing from "./pages/VideoListing";

function App() {
  return (
    <Router>
      <NavBar/>
      <Container>
      <Switch>
        <Route exact path="/" component={VideoListing}/>
        <Route  exact path="/video/:id" component={VideoDetails}/>
      </Switch> 
      </Container>
    </Router>
  );
}

export default App;
