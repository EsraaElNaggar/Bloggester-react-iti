import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import axios from 'axios';

import LandingPage from "./pages/landingPage";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import Home from "./pages/home";
import MyProfile from "./pages/myProfile";
import BlogForm from "./pages/blogForm";
import UserExplorer from "./pages/userExplorer";
import UserProfile from "./pages/userProfile";
import ContactUs from "./pages/contactUs";
import Error from "./pages/error";
import BlogPage from './pages/blogPage';
import { getTokenFromLocalStorage, getUserIdFromLocalStorage } from './_utilities/storager';



class App extends Component {
  state = {
    currentUser: {},
    token: ""
  };

  componentDidMount() {
    this.getCurrentUser();
    this.getToken()
  }
  getToken() {
    const token = getTokenFromLocalStorage();
    this.setState({ token: token })
  }

  async getCurrentUser() {
    const me = getUserIdFromLocalStorage();
    const res = await axios.get(`http://localhost:4000/users/${me}`);
    this.setState({ currentUser: res.data });
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route path="/login"
              render={props => (
                <Login
                  {...props}
                />
              )}
            />
            <Route path="/signup"
              render={props => (
                <SignUp
                  {...props}
                />
              )}
            />
            <Route path="/landingPage" component={LandingPage} />
            <Route path="/userExplorer"
              render={props => (
                < UserExplorer
                  {...props}
                  currentUser={this.state.currentUser}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/userProfile/:id"
              render={props => (
                <UserProfile
                  {...props}
                  currentUser={this.state.currentUser}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/myProfile"
              render={props => (
                <MyProfile
                  {...props}
                  currentUser={this.state.currentUser}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/blogForm/:id"
              render={props => (
                <BlogForm
                  {...props}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/blogForm"
              render={props => (
                <BlogForm
                  {...props}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/blog/:id"
              render={props => (
                <BlogPage
                  {...props}
                  currentUser={this.state.currentUser}
                  token={this.state.token}
                />
              )}
            />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/error" component={Error} />
            <Route path="/home"
              render={props => (
                <Home
                  {...props}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            <Redirect from="/" to="/landingPage" />
            <Redirect to="/error" />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
export default App;