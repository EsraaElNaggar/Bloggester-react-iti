import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";

import NavBar from '../components/navbar';
import UserCard from '../components/userCard';
import Pagination from '../components/pagination';

class UserExplorer extends Component {
    state = {
        users: [],
        pageSize: 12,
        activePage: 1
    }
    handlePageChange = page => {
        this.setState({ activePage: page });
    };

    componentDidMount() {

        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/users');
        this.setState({ users: res.data });
    }

    render() {
        let users = this.state.users;

        //Start Index
        const startIndex = (this.state.activePage - 1) * this.state.pageSize;

        //Showed Products
        const showedUsers = _(this.state.users)
            .slice(startIndex)
            .take(this.state.pageSize)
            .value();

        return (
            <React.Fragment>
                <NavBar />
                <h2 className=" container myTitle" >Explore Users...</h2>
                {/* {showedUsers._id !== this.props.currentUser._id && */}
                <div className="profiles container">
                    {showedUsers.map(
                        user => (
                            <UserCard
                                key={user._id}
                                userId={user._id}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                userImg={user.userImg}
                                userTitle={user.userTitle}
                                following={user.following}
                                followers={user.followers}
                                token={this.props.token}
                            />
                        )
                    )}
                </div>
                {/* } */}
                {users.length > this.state.pageSize && (
                    <Pagination
                        activePage={this.state.activePage}
                        pageCount={users.length / this.state.pageSize}
                        onPageChange={this.state.onPageChange}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default UserExplorer;