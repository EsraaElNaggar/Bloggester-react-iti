import React from 'react';

const Textarea = props => {
    const { name, placeholder, className, value, onChange } = props;
    return (
        <React.Fragment>
            <textarea
                wrap="soft"
                id={name}
                name={name}
                cols={30}
                rows={10}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
        </React.Fragment>
    );
};

export default Textarea;