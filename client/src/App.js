import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import PrivateRoute from "./util/PrivateRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <PrivateRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/register" component={Register} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
