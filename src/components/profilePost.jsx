import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfilePost extends Component {
    // state = {  }
    render() {
        const p = this.props;
        return (
            <React.Fragment>
                <div>
                    <div className="wrapperPost" style={{ background: `url(${p.blogImg})center/cover no-repeat` }}>
                        <div className="headerPost">
                            <div className="datePost">
                                {/* <span className="day">{p.publishDay}</span>
                                <span className="month"> {p.publishMonth}</span>
                                <span className="year"> {p.publishYear}</span> */}
                            </div>
                        </div>
                        <div className="dataPost">
                            <div className="contentPost">
                                <span className="userPost">{p.firstName} {p.lastName}</span>
                                <h1 className="titlePost">
                                    <Link to={"/blog/" + p.blogId}>{p.blogTitle}</Link>
                                </h1>
                                <p className="textPost">{p.blogBody.slice(0, 200)}...
                                </p>
                                <Link to={"/blog/" + p.blogId} className="buttonPost">Read more</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default ProfilePost;