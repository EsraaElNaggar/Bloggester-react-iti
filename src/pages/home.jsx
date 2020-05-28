import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";

import NavBar from '../components/navbar';
import HomePost from '../components/homePost';
import Pagination from '../components/pagination';

class Home extends Component {
    state = {
        blogs: [],
        users: [],
        pageSize: 5,
        activePage: 1
    }

    handlePageChange = page => {
        this.setState({ activePage: page });
    };

    componentDidMount() {
        Promise.all([this.getUsers(), this.getBlogs()])
            .then(([users, blogs]) => {

                this.setState({
                    blogs, users
                })
            })
    }

    async getBlogs() {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/blogs');
        return res.data;
        // this.setState({ blogs: res.data });
    }
    async getUsers() {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + "/users");
        return res.data
        // this.setState({ users: res.data });
    }

    render() {
        let { blogs, users } = this.state;
        //Start Index
        const startIndex = (this.state.activePage - 1) * this.state.pageSize;
        //Showed Products
        const showedBlogs = _(blogs).reverse()
            .slice(startIndex)
            .take(this.state.pageSize)
            .value()
        return (
            <React.Fragment>
                <NavBar />
                <div >
                    <h2 className="myTitle container">Recent Blogs...</h2>
                    {/* el mafroud hena law el user logged in tezhar */}
                    {/* {this.props.currentUser._id && */}
                    <div className="WBBtnDiv2">
                        <a href="/blogForm" className="WBBtn">Write a Blog</a>
                    </div>
                    {/* } */}
                </div>
                {(blogs.length && users.length) ?
                    showedBlogs.map(
                        blog => (
                            <HomePost
                                key={blog._id}
                                userId={blog.userId}
                                blogId={blog._id}
                                blogImg={blog.blogImg}
                                blogTitle={blog.blogTitle}
                                blogBody={blog.blogBody}
                                currentDate={blog.currentDate}
                                // publishDay={blog.publishDay}
                                // publishMonth={blog.publishMonth}
                                users={this.state.users}
                                currentUser={this.props.currentUser}
                            />
                        ))
                    : <div>Loading ...</div>}

                {blogs.length > this.state.pageSize && (
                    <Pagination
                        activePage={this.state.activePage}
                        pageCount={blogs.length / this.state.pageSize}
                        onPageChange={this.handlePageChange}
                    />
                )}

            </React.Fragment>
        );
    }
}

export default Home;