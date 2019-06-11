##This Project was created using React with @bradtraversy

##What can you do:

1. Open https://githubers.netlify.com/
2. Search for your username or your friend's
3. See how your Bio and stats look on the website.
4. For example: My account settings for Hireable was null so it was not showing up, you can change this under your account settings in your github profile.

#The main goal of this project is to:

- understand React props, state
- understanding Class and functional component
- have an intro to Hooks
- learned about <Fragments/>

#The hooks used in this project:

1. useState
2. useReducer
3. useContext

# The useState was used to initialize state and functions that can modify them.

#Because I want to use react hooks, the components are also changed from clas based to functional based, which means that we cannot use state.

Example:

- const [text, setText] = useState("");
  - with this, the text state is initialized to have a value of "" an empty string.
  - then liek setState, because we are using the useState hook we can just simply use "setText"

# the React context API was used to maintain reducers and actions

- created a new folder under /src named context
- in this folder, another folder, this time to sepparate states. (Alert and github users)
- in each folder, really simillar to redux, we have a folder that maintain the state, reducers, and action creators.

# useContext hook is used like MapStateToProps, where we can subscribe components to the relevant state and functions from the global \_state.js

#API - borrowed data from github APIhe

- retrived data of Users using search/users end point
- we then added functionality to also get more data of each individual, by pluggin in their usename in another search end point. /user/\${login}
