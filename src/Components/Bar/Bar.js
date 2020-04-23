import React from 'react';
import PropTypes from 'prop-types';
import './Bar.css';



function Bar(props) {

    const style = {
        height: props.value,
        backgroundColor: props.style ? 'blueviolet' : 'skyblue',
    };

    return (
        <div className="bar" id={props.id} style={style}>
            <div className="value">{props.value}</div>
        </div>
    );
}

Bar.defaultProps = {
    value: 10,
};

Bar.propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.bool.isRequired,
}

export default Bar;
