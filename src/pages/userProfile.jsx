import React, { Component } from 'react';

import NavBar from '../components/navbar';
import Profile from '../components/profile';

class UserProfile extends Component {
    // state = {  }
    render() {

        return (
            <React.Fragment>
                <NavBar />
                <Profile
                    {...this.props}
                />
            </React.Fragment>
        );
    }
}

export default UserProfile;