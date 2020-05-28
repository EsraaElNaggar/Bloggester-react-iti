import React, { Component } from 'react';
class LandingPage extends Component {
    // state = {  }
    render() {
        return (
            <React.Fragment>
                <div className="landC ">
                    <nav className="navbar navbar-expand-lg navbar-dark container" style={{ marginTop: "2%" }}>
                        <a className="btn btn-warning mr-2" href="/login">Login</a>
                        <a className="btn btn-outline-warning mr-2 " href="/signUp">Sign Up</a>
                    </nav>
                    <div className="container">
                        <h1 className="display-1 mt-5">Bloggester</h1>
                        <p className="mt-5 h4 font-weight-lighter">Your portal to share your words...</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LandingPage;