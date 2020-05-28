import React from "react";

const Input = props => {
    const { name, type, placeholder, value, className, error, onChange } = props;
    return (
        <React.Fragment>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={onChange}
            />
            {error && <div style={{ color: "gold" }}>{error}</div>}
        </React.Fragment>
    );
};

export default Input;