import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserFromLocalStorage, clearLocalStorage } from '../_utilities/storager';

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            isActive: true,
            activeIndex: 0
        }
        this.toggleClass = this.toggleClass.bind(this);
    }

    toggleClass = (index, e) => {
        this.setState({ activeIndex: index });
    }

    toggle = (e) => {
        this.setState({ isActive: !this.state.isActive });
    }

    componentDidMount() {
        this.setState({ currentUser: getUserFromLocalStorage() });
    }

    onClick = (e) => {
        clearLocalStorage();
    }

    render() {
        const currentUser = this.state.currentUser;
        return (
            <React.Fragment>
                <div className="fixed-top navColournShadow  " >
                    <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
                        <nav className="navbar navbar-expand-lg navbar-dark   container" >
                            <a className="navbar-brand" href="/home" style={{ fontFamily: '"Pacifico", cursive', color: 'gold' }}>Bloggester</a>
                            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button> */}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item ">
                                        <a className='nav-link' href="/home">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className='nav-link' href="/userExplorer">Explore Users</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className='nav-link' href="/contactUs">Contact Us</a>
                                    </li>
                                </ul>
                                <div className="dropImgList" >
                                    {/* <div id="cover">
                                        <form method="get" action="">
                                            <div className="tb">
                                                <div className="td">
                                                    <input className="searchInput" type="text" placeholder="Search" required />
                                                </div>
                                                <div className="td" id="s-cover">
                                                    <button className="searchBtn" type="submit">
                                                        <div id="s-circle"></div>
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div> */}
                                    <div className="imgNav" style={{ backgroundImage: `url(${currentUser?.userImg})` }}></div>
                                    <button onClick={this.toggle} type="button" className="dropdown-toggle dropme"></button>
                                    <div className={(this.state.isActive) ? "dropNav activedrop " : "dropNav "} style={{ textAlignLast: "left" }} >
                                        <Link className="itemNavCont dropdown-item" to="/myProfile">My Profile</Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="itemNavCont dropdown-item" onClick={this.onClick} href="/landingPage">Sign Out</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NavBar;