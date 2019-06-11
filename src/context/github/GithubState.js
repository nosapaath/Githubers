// this is where all our action goes
import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import githubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // SEARCH USER
  // axios get list of users request from the github api
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };
  // GET USER
  const getUser = async login => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };
  // users array to empty
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // GET REPOS
  const getUserRepos = async login => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_USER_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_USER_CLIENT_SECRET}`
    );
    dispatch({ type: GET_REPOS, payload: res.data });
  };
  // CLEAR USER
  // SET LOADING
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
