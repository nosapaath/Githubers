import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/user/Users";
import axios from "axios";
import "./App.css";
import Search from "./components/user/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/user/User";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // axios get request from the github api
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // Get github user
  getUser = async login => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  //get user repos
  getUserRepos = async login => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  // emptying users array to empty
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
      alert: null
    });
  };

  // let client know that they cant search empty string
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
