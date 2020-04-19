import React from 'react';
import './Bar.css';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="bar" style={{height: this.props.value }}>
                <div className="value">{this.props.value}</div>
            </div>
        )
    }
}

Bar.defaultProps = {
    value: 10
}

export default Bar;