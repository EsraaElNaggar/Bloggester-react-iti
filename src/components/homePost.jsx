import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePost extends Component {

    render() {
        const p = this.props;

        // const user = this.props.users;
        let user = p.users.filter(u => u._id === p.userId)[0];

        return (
            <React.Fragment>
                {p.blogBody &&
                    <div className="blogCard">
                        <div className="bcPic">
                            <img alt="" className="leftSide" src={p.blogImg} />
                        </div>
                        <div className="rightSide">
                            <Link to={"/blog/" + p.blogId} ><h1 className="bcH1">{p.blogTitle}</h1></Link>
                            <div className="bcUser">
                                <img alt={user?.firstName} className="bcAPic" src={user?.userImg} />
                                {p.userId === this.props.currentUser._id ? <Link to="/myProfile/" className="bcAH2">{user?.firstName} {user?.lastName}</Link> : <Link to={"/userProfile/" + p.userId} className="bcAH2">{user?.firstName} {user?.lastName}</Link>}
                            </div>
                            <div className="separator">
                                <p className="bcAP"> {p.blogBody.slice(0, 420)}...
                            </p>
                            </div>
                            {/* <h5 className="bcH5">{p.publishDay}</h5>
                        <h6 className="bcH6">{p.publishMonth}</h6> */}
                            <Link to={"/blog/" + p.blogId} className="bcfab">
                                <i className="fa fa-arrow-right fa-3x"> </i>
                            </Link>
                        </div>
                    </div >}
            </React.Fragment >
        );
    }
}

export default HomePost;