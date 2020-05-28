import React, { Component } from 'react';
// import _ from "lodash";
import axios from "axios";

import NavBar from "../components/navbar";
import ImgInput from "../components/imgInput";
import Input from "../components/input";
import Textarea from '../components/textarea';
import { getUserIdFromLocalStorage } from '../_utilities/storager';

class BlogForm extends Component {

    state = {
        blog: {
            _id: '',
            userId: getUserIdFromLocalStorage(),
            blogImg: '',
            blogTitle: '',
            blogBody: '',
        }
    };

    componentDidMount() {
        // console.log(!this.props.match.params.id, this.props.match.params.id);

        if (this.props.match.params.id) {
            axios.get(`http://localhost:4000/blogs/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({ blog: res.data })
                })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('_id', this.state.blog._id);
        formData.append('userId', this.state.blog.userId);
        formData.append('myImage', this.state.blog.blogImg);
        formData.append('blogTitle', this.state.blog.blogTitle);
        formData.append('blogBody', this.state.blog.blogBody);

        console.log(formData);
        // Call backend 
        if (!this.props.match.params.id) {
            this.add(formData);
        }
        else {
            this.edit(formData);
        }
    }

    handleChange = ({ target }) => {
        //Clone
        const blog = { ...this.state.blog };
        //Edit
        if (target.files) {
            // console.log(target.files[0]);
            // console.log(target.id);
            blog[target.id] = target.files[0];
        }
        else {
            // console.log(target);
            blog[target.id] = target.value;
        }
        //Set Satate
        this.setState({ blog });
    }

    add = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': this.props.token
            }
        };

        axios.post("http://localhost:4000/blogs", formData, config)
            .then(res => {
                this.props.history.replace(`/blog/${res.data._id}`);
            })
            .catch(err => {
                this.props.history.replace("/error");
            })
    }
    edit = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': this.props.token
            }
        };
        axios.put(`http://localhost:4000/blogs/${this.props.match.params.id}`, formData, config)
            .then(res => {
                this.props.history.replace(`/blog/${res.data._id}`);
            })
            .catch(err => {
                this.props.history.replace("/error");
            })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <form className="wrapperNewB" onSubmit={this.handleSubmit}>
                    <div className="titleThings">
                        <p className="h3 mb-3">Add New Blog</p>
                        <div className="separatorYellow" />
                    </div>
                    <ImgInput
                        name="blogImg"
                        onChange={this.handleChange}
                    />
                    <div className="form__group field">
                        <Input
                            type="input"
                            className="form__field"
                            placeholder="Title"
                            name="blogTitle"
                            id="title"
                            value={this.state.blog.blogTitle}
                            onChange={this.handleChange}
                            required
                            autoFocus
                        />
                        <label htmlFor="blogTitle" className="form__label">Title</label>
                    </div>
                    <div className="form__group field">
                        <Textarea
                            className="form__field"
                            name="blogBody"
                            id="Body"
                            placeholder="Body"
                            value={this.state.blog.blogBody}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="blogBody" className="form__label">Body</label>
                    </div>
                    <div className="form__group " style={{ display: "flex", flexFlow: "column" }}>
                        <div className="taged-textbox__data">
                            <div className="taged-textbox__tags">
                                <div className="taged-textbox__tag">
                                    <span>tag1</span>
                                    <a className="taged-textbox__remove">
                                        <i className="fas fa-times"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Input
                            type="input"
                            className="form__field"
                            placeholder="Tag"
                            name="tag"
                            required
                            autoFocus
                        />
                        <label htmlFor="tags" className="form__label">Tags</label>
                    </div>
                    <button className="formBtn" type="submit">Publish</button>
                </form>
            </React.Fragment>
        );
    }
}

export default BlogForm;