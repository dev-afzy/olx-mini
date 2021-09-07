import React, { useEffect, useContext } from 'react';
import { AuthContext, FirebaseContext } from './store/Context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userDetails) => {
      if (userDetails) {
        setUser(userDetails);
      }
    });
    return () => {
      return () => {
        setUser(); // This worked for me
      };
    };
  });
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/view/:id" component={ViewPost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
