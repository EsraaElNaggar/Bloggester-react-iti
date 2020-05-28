import React, { Component } from 'react';
import axios from 'axios';
import _ from "lodash";

import ProfilePost from './profilePost';
import { getUserFromLocalStorage, getUserIdFromLocalStorage, setUserToLocalStorage, getTokenFromLocalStorage } from '../_utilities/storager';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            user: {},
            token: "",
            addNew: true,
            btnExist: false,
            isToggleOn: ""
        };
    }


    componentDidMount() {
        this.setState({ token: getTokenFromLocalStorage() });

        if (this.props.match.params.id === this.props.currentUser._id || _.isEmpty(this.props.match.params)) {
            this.setState({ user: getUserFromLocalStorage() });
            axios.get(`http://localhost:4000/blogs/user/${getUserIdFromLocalStorage()}`)
                .then(res => {
                    this.setState({ blogs: res.data, addNew: true, btnExist: false });
                })
                .catch(err => {
                    this.props.history.replace("/error");
                })
        }
        else {
            axios.get(`http://localhost:4000/users/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({ user: res.data })
                    axios.get(`http://localhost:4000/blogs/user/${this.props.match.params.id}`)
                        .then(res => {
                            this.setState({ blogs: res.data, addNew: false, btnExist: true });
                            const followingg = this.props.currentUser.following?.includes(this.props.match.params.id);
                            switch (followingg) {
                                case true:
                                    this.setState({ isToggleOn: "Unfollow" });
                                    break;
                                case false:
                                    this.setState({ isToggleOn: "Follow" });
                                    break;
                                default:
                                    break;
                            }
                        })
                        .catch(err => {
                            this.props.history.replace("/error");
                        })
                })

        }

    }

    handleClick = () => {
        const token = this.state.token;

        const following = this.props.currentUser.following.includes(this.props.match.params.id);
        switch (following) {
            case true:
                axios.post(`http://localhost:4000/users/unfollow/${this.props.match.params.id}`, "", { headers: { 'auth-token': token } })
                    .then(res => {
                        axios.get(`http://localhost:4000/users/${this.props.currentUser._id}`)
                            .then(res => {
                                setUserToLocalStorage(res.data)
                                this.setState({ currentUser: res.data });
                                this.setState({
                                    isToggleOn: "Follow"
                                });
                            })
                            .catch(err => {
                                this.props.history.replace("/error");
                            })
                    })
                    .catch(err => {
                        this.props.history.replace("/error");
                    })
                break;

            case false:
                axios.post(`http://localhost:4000/users/follow/${this.props.match.params.id}`, "", { headers: { 'auth-token': token } })
                    .then(res => {
                        axios.get(`http://localhost:4000/users/${this.props.currentUser._id}`)
                            .then(res => {
                                setUserToLocalStorage(res.data);
                                this.setState({ currentUser: res.data });
                                this.setState({
                                    isToggleOn: "Unfollow"
                                });
                            })
                            .catch(err => {
                                this.props.history.replace("/error");
                            })
                    })
                    .catch(err => {
                        this.props.history.replace("/error");
                    })
                break;
            default:
                break;
        }
    }

    render() {
        const user = this.state.user;
        const blogs = this.state.blogs.reverse();

        return (
            <React.Fragment>
                <div className="profilyThings container">
                    <div className="wrapperP">
                        <div className="profile">
                            <img alt=" " src={user.userImg} className="thumbnail" />
                            <div className="check"><i className="fas fa-check" /></div>
                            <h3 className="name">{user.firstName} {user.lastName}</h3>
                            <p className="title">{user.userTitle}</p>
                            {this.state.btnExist &&
                                <button type="button" onClick={this.handleClick} className="Userbtn2">{this.state.isToggleOn}</button>
                                // : <button type="button" onClick={this.handleClick} className="Userbtn">Follow</button>
                                // <button type="button" className="Userbtn">Follow</button>
                            }
                        </div>
                        <div className="social-icons">
                            <div className="icon">
                                <h4>{user.followers?.length}</h4>
                                <p>Followers</p>
                            </div>
                            <div className="icon">
                                <h4>{user.following?.length}</h4>
                                <p>Following</p>
                            </div>
                            <div className="icon">
                                <h4>{blogs.length}</h4>
                                <p>Posts</p>
                            </div>
                        </div>
                    </div>
                    <div className="ProfileContent">
                        <div className="postsGroup">
                            {blogs.map(blog => (
                                <ProfilePost
                                    key={blog._id}
                                    userId={blog.userId}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    blogId={blog._id}
                                    blogImg={blog.blogImg}
                                    blogTitle={blog.blogTitle}
                                    blogBody={blog.blogBody}
                                />
                            ))}
                        </div>

                    </div>
                    {this.state.addNew &&
                        <div className="WBBtnDiv">
                            <a href="/blogForm" className="WBBtn">Write a Blog</a>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;