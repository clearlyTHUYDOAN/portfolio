import React from 'react';
import {Link} from 'react-router';
import './App.css';

class Header extends React.Component {
    render () {
        return (
            <div>
                <h1 className="text-center">EXPRESS API</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                {this.props.children}               
            </div>
        )
    }
}

export default Header;