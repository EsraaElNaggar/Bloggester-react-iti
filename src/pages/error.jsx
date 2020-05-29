import React, { Component } from 'react';

import Navbar from "../components/navbar";

class Error extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="error" style={{ backgroundImage: `url(/errorpage404.gif)` }}>
                </div>
            </React.Fragment >
        );
    }
}

export default Error;