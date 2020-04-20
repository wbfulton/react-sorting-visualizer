import React from 'react';
import './Bar.css';

class Bar extends React.Component {
    render() {
        return (
            <div className="bar" style={{height: this.props.value, backgroundColor: this.props.style ? 'blueviolet' : 'skyblue' }}>
                <div className="value">{this.props.value}</div>
            </div>
        )
    }
}

Bar.defaultProps = {
    value: 10
}

export default Bar;