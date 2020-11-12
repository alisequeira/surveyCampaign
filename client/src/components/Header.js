import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {

    renderContent = () => {
        switch (this.props.auth) {
            case null:
                return 'still deciding';
            case false:
                return 'I\' loggedout';
            default:
                return 'I\' logged in';
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Emaily</a>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Header);