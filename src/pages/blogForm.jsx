import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
// import _ from "lodash";
import axios from "axios";

import NavBar from "../components/navbar";
import ImgInput from "../components/imgInput";
import Input from "../components/input";
import Textarea from '../components/textarea';
import { getUserIdFromLocalStorage, getTokenFromLocalStorage } from '../_utilities/storager';


const KeyCodes = {
    comma: 188,
    enter: 13,
    SPACE: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.SPACE];
const placeholder = "Tags";

class BlogForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {
                _id: '',
                userId: getUserIdFromLocalStorage(),
                blogImg: '',
                blogTitle: '',
                blogBody: '',
                tags: [],
            },
            token: "",
            suggestions: [
                { id: 'HTML', text: 'HTML' },
                { id: 'CSS', text: 'CSS' },
                { id: 'NodeJs', text: 'NodeJs' },
                { id: 'REACT', text: 'REACT' },
                { id: 'MERN', text: 'MERN' },
                { id: 'JavaScript', text: 'JavaScript' }
            ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        this.setState({ token: getTokenFromLocalStorage() });

        if (this.props.match.params.id) {
            axios.get(process.env.REACT_APP_BACKEND_URL + `/blogs/${this.props.match.params.id}`)
                .then(res => {
                    let tag = [];
                    res.data.tags.forEach(element => {
                        tag.push({ id: element, text: element })
                    });
                    res.data.tags = tag;
                    this.setState({ blog: res.data })
                })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let tag = [];
        this.state.blog.tags.forEach(element => {
            tag.push(element.text);
        });

        let formData = new FormData();
        formData.append('_id', this.state.blog._id);
        formData.append('userId', this.state.blog.userId);
        formData.append('myImage', this.state.blog.blogImg);
        formData.append('blogTitle', this.state.blog.blogTitle);
        formData.append('blogBody', this.state.blog.blogBody);
        formData.append('tags', tag);

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
            blog[target.id] = target.files[0];
        }
        else {
            blog[target.id] = target.value;
        }
        //Set Satate
        this.setState({ blog });
    }

    add = (formData) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'auth-token': this.state.token
            }
        };

        axios.post(process.env.REACT_APP_BACKEND_URL + "/blogs", formData, config)
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
                'auth-token': this.state.token
            }
        };
        axios.put(process.env.REACT_APP_BACKEND_URL + `/blogs/${this.props.match.params.id}`, formData, config)
            .then(res => {
                this.props.history.replace(`/blog/${res.data._id}`);
            })
            .catch(err => {
                this.props.history.replace("/error");
            })
    }

    handleDelete = (i) => {
        const { blog } = this.state;
        blog.tags = blog.tags.filter((tag, index) => index !== i);
        this.setState({ blog })
    }

    handleAddition = (tag) => {
        const { blog } = this.state;
        blog.tags = [...blog.tags, tag];
        this.setState({ blog })
    }

    handleDrag = (tag, currPos, newPos) => {
        const tags = [...this.state.blog.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
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
                    <div className="container" style={{ width: "73%" }} >
                        <label htmlFor="blogBody" className="form__label2">Tags</label>
                        <ReactTags
                            tags={this.state.blog.tags}

                            classNames={{
                                tags: 'tagsClass',
                                // tagInput: 'tagInputClass',
                                tagInputField: 'form__field',
                                selected: 'selectedClass',
                                tag: 'taged-textbox__tag',
                                remove: 'taged-textbox__remove',
                                // suggestions: 'suggestionsClass',
                                // activeSuggestion: 'activeSuggestionClass'
                            }}
                            inputFieldPosition="bottom"
                            autofocus={false}
                            placeholder={placeholder}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters}
                        />
                    </div>
                    {/* <div className="form__group " style={{ display: "flex", flexFlow: "column" }}>
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
                    </div> */}
                    <button className="formBtn" type="submit">Publish</button>
                </form>
            </React.Fragment>
        );
    }
}

export default BlogForm;