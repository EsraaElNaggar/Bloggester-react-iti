import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import _ from "lodash";

import NavBar from '../components/navbar';
import Taga from '../components/tags';
import { getTokenFromLocalStorage, getUserFromLocalStorage } from '../_utilities/storager';

class BlogPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            users: {},
            token: "",
            currentUser: {}
        };
        this.handleClick = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.setState({ token: getTokenFromLocalStorage(), currentUser: getUserFromLocalStorage() });
        this.getBlog();
    }
    getBlog = async () => {
        await axios.get(process.env.REACT_APP_BACKEND_URL + `/blogs/${this.props.match.params.id}`)
            .then(res => {
                this.getUsers(res.data.userId);
                this.setState({ blog: res.data });
            });
    }
    getUsers = async (id) => {
        await axios.get(process.env.REACT_APP_BACKEND_URL + `/users/${id}`)
            .then(res => {
                this.setState({ users: res.data });
            })
    }
    handleDelete = () => {

        axios.delete(process.env.REACT_APP_BACKEND_URL + `/blogs/${this.props.match.params.id}`, { headers: { 'auth-token': this.state.token } })
            .then(res => {
                this.props.history.replace("/myProfile");
            })
            .catch(err => {
                this.props.history.replace("/error");
            })
    }


    render() {
        const p = this.state;
        const user = this.state.users;
        const blog = this.state.blog;

        return (
            <React.Fragment>
                <NavBar />
                <div className="blogPage">
                    <div className="container">
                        <h1 className="blogTitle">{blog.blogTitle}</h1>
                    </div>
                    <div className="blogImg" style={{ backgroundImage: `url(${blog.blogImg})` }}></div>
                    <div className="container " style={{ display: "flex", justifyContent: "space-between" }} >
                        <div className="blogUser container" >
                            <div className="blogUserImg" style={{ backgroundImage: `url(${user.userImg})` }}></div>
                            <div className="blogUserDet">
                                {blog.userId === this.state.currentUser._id ? <Link to="/myProfile/" className="blogUserName">{user.firstName} {user.lastName}</Link> : <Link to={"/userProfile/" + blog.userId} className="blogUserName">{user.firstName} {user.lastName}</Link>}
                                {/* <p className="blogDate">{user.userTitle} </p> */}
                                <p className="blogDate">{moment(blog.currentDate).format('DD')} <span>{moment(blog.currentDate).format('MMM')}</span> {moment(blog.currentDate).format('YY')} </p>
                            </div>
                        </div>
                        {blog.userId === this.state.currentUser._id &&
                            <div className="blogOper">
                                <Link to={`/blogForm/${blog._id}`} >
                                    <i className="fas fa-edit"></i>
                                </Link>
                                <a onClick={this.handleDelete}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </div>}
                    </div>
                    <div className="taged-textbox__data container">
                        <div className="taged-textbox__tags">
                            {!_.isEmpty(blog.tags) && blog.tags.map(tag => (
                                <Taga
                                    key={tag.id}
                                    text={tag}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="blogBodyy container">
                        <p className="blogBody">{blog.blogBody}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BlogPage;