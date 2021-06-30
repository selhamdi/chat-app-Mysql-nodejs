import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Login from './components/Login';
import RoomList from './components/RoomList';
import AddRoom from './components/AddRoom';
import ChatRoom from './components/ChatRoom';
import sendMail from "./components/SendMail"
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
function App() {
  let location = useLocation();

  return (
    <Router>
      <div>
        <Redirect
          to={{
            pathname: "/roomlist",
            state: { from: location }
          }}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/singIn" component={SignIn} />
        <Route exact path="/singUp" component={SignUp} />
        <Route exact path="/mail" component={sendMail} />
          <SecureRoute path="/roomlist">
            <RoomList />
          </SecureRoute>
          <SecureRoute path="/addroom">
            <AddRoom />
          </SecureRoute>
          <SecureRoute path="/chatroom/:room">
            <ChatRoom />
          </SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function SecureRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('nickname') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/singIn",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



// import React from "react";
// import { Switch, Route } from "react-router-dom";


// import "./App.css";

// const App = () => (
//   <div className="App">
//     <Switch>
     

//     </Switch>
//   </div>
// );

// export default App;
