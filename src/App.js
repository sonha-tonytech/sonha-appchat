import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import "./App.css";

class App extends React.Component {
  state = {
    userLogin: JSON.parse(localStorage.getItem("userLogin")),
    users: JSON.parse(localStorage.getItem("users")),
    groups: JSON.parse(localStorage.getItem("groups")),
    messages: JSON.parse(localStorage.getItem("messages")),
  };

  handleSetUserLogin = (userLogin) => {
    this.setState({
      userLogin: userLogin,
    });
    localStorage.setItem("userLogin", JSON.stringify(this.state.userLogin));
  };

  handleSetUsers = (users) => {
    this.setState({
      users: users,
    });
    localStorage.setItem("users", JSON.stringify(this.state.users));
  };

  handleSetGroups = (groups) => {
    this.setState({
      groups: groups,
    });
    localStorage.setItem("groups", JSON.stringify(this.state.groups));
  };

  handleSetMessages = (messages) => {
    this.setState({
      messages: messages,
    });
    localStorage.setItem("messages", JSON.stringify(this.state.messages));
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                data={this.state}
                handleSetUserLogin={this.handleSetUserLogin}
                handleSetGroups={this.handleSetGroups}
                handleSetMessages={this.handleSetMessages}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                users={this.state.users}
                handleSetUserLogin={this.handleSetUserLogin}
              />
            )}
          />
          <Route
            path="/register"
            render={() => (
              <Register
                users={this.state.users}
                handleSetUsers={this.handleSetUsers}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
