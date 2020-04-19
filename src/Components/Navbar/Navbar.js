import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="navbar">
                <h1>React Sorting Visualizer</h1>
                <p>Created April 19th, 2020</p>
            </div>
        );
    }
}

Navbar.defaultProps = {};

export default Navbar;
