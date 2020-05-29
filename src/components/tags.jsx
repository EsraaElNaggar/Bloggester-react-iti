import React from 'react';

const Taga = props => {
    const { text } = props;
    return (
        <React.Fragment>

            <div className="taged-textbox__tag">
                <a className="taged-textbox__remove">
                    <i className="fas fa-hashtag"></i>
                </a>
                <span>{text}</span>
            </div>
        </React.Fragment>
    );
}

export default Taga;