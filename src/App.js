import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

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

class App extends Component {

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
                />
              )}
            />
            <Route path="/userProfile/:id"
              render={props => (
                <UserProfile
                  {...props}
                />
              )}
            />
            <Route path="/myProfile"
              render={props => (
                <MyProfile
                  {...props}
                />
              )}
            />
            <Route path="/blogForm/:id"
              render={props => (
                <BlogForm
                  {...props}
                />
              )}
            />
            <Route path="/blogForm"
              render={props => (
                <BlogForm
                  {...props}
                />
              )}
            />
            <Route path="/blog/:id"
              render={props => (
                <BlogPage
                  {...props}
                />
              )}
            />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/error" component={Error} />
            <Route path="/home"
              render={props => (
                <Home
                  {...props}
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