import React from 'react';

const ImgInput = props => {
    const { name, onChange } = props;
    return (
        <React.Fragment>
            <div className="formGroup">
                <div className="form__group field">
                    <div className="input-group">
                        <div className="custom-file" style={{ textAlign: "left" }}>
                            <input
                                type="file"
                                name={name}
                                className="custom-file-input"
                                id={name}
                                onChange={onChange}
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                aria-describedby="inputGroupFileAddon04"
                            />
                            <label className="custom-file-label" htmlFor={name}>Upload Image</label>
                        </div>
                        {/* <div className="input-group-append">
                                <button className="btn btn-outline-warning" type="button" id="inputGroupFileAddon04">Button</button>
                            </div> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ImgInput;