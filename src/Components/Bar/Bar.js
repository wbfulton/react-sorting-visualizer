import React from 'react';
import PropTypes from 'prop-types';
import './Bar.css';

function Bar(props) {
    let color;

    if (props.swap) {
        color = 'red';
    } else if (props.compare) {
        color = 'blueviolet';
    } else if (props.subArray) {
        color = 'gray';
    } else {
        color = 'skyblue';
    }

    const style = {
        height: props.value,
        backgroundColor: color,
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
    swap: PropTypes.bool.isRequired,
    compare: PropTypes.bool.isRequired,
    subArray: PropTypes.bool.isRequired,
};

export default Bar;
