import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUserToLocalStorage, getUserFromLocalStorage } from '../_utilities/storager';


class UserCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: {},
            blogs: [],
            isToggleOn: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const currentUser = getUserFromLocalStorage()
        this.setState({ currentUser: currentUser });

        const follow = currentUser.following?.includes(this.props.userId);
        this.setState({ isToggleOn: follow });

        axios.get(process.env.REACT_APP_BACKEND_URL + `/blogs/user/${this.props.userId}`)
            .then(res => {
                this.setState({ blogs: res.data })
            })
    }

    handleClick = () => {
        const token = this.props.token;

        const follow = this.state.currentUser.following.includes(this.props.userId);
        switch (follow) {
            case true:
                axios.post(process.env.REACT_APP_BACKEND_URL + `/users/unfollow/${this.props.userId}`, "", { headers: { 'auth-token': token } })
                    .then(res => {
                        this.setState({ currentUser: res.data });
                        setUserToLocalStorage(res.data)
                        this.setState(e => ({
                            isToggleOn: !e.isToggleOn
                        }));
                    })
                    .catch(err => {
                        this.props.history.replace("/error");
                    })
                break;

            case false:
                axios.post(process.env.REACT_APP_BACKEND_URL + `/users/follow/${this.props.userId}`, "", { headers: { 'auth-token': token } })
                    .then(res => {
                        this.setState({ currentUser: res.data });
                        setUserToLocalStorage(res.data);
                        this.setState(e => ({
                            isToggleOn: !e.isToggleOn
                        }));
                    })
                    .catch(err => {
                        this.props.history.replace("/error");
                    })
            default:
                break;
        }
    }

    render() {
        let u = this.props;
        let s = this.state;

        return (
            <React.Fragment>
                {u.userId !== s.currentUser._id &&
                    <div className="wrapperEP">
                        <div className="profile">
                            <img alt="" src={u.userImg} className="thumbnail" />
                            <div className="check"><i className="fas fa-check" /></div>
                            <h3 className="name">
                                <Link to={"/userProfile/" + u.userId}>{u.firstName} {u.lastName}</Link>
                            </h3>
                            <p className="title">{u.userTitle}</p>
                            {this.state.isToggleOn ? <button type="button" onClick={this.handleClick} className="Userbtn2">UnFollow</button> : <button type="button" onClick={this.handleClick} className="Userbtn">Follow</button>}
                        </div>
                        <div className="social-icons">
                            <div className="icon">
                                <h4>{u.followers.length}</h4>
                                <p>Followers</p>
                            </div>
                            <div className="icon">
                                <h4>{u.following.length}</h4>
                                <p>Following</p>
                            </div>
                            <div className="icon">
                                <h4>{this.state.blogs.length}</h4>
                                <p>Posts</p>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default UserCard;