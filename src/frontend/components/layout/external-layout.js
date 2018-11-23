import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

class ExternalLayout extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/status">Status</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    </ul>
                </nav>
                {this.props.children}
            </div>);
    }
}

export default ExternalLayout;
