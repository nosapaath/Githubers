import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/user/Users";
import axios from "axios";
import "./App.css";
import Search from "./components/user/Search";
// import { async } from "q";

class App extends Component {
  state = {
    users: [],
    loading: false
  };
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };
  render() {
    return (
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
