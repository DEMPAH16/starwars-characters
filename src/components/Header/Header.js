import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logOut } from '../../redux/actions/user-actions';

const Header = ({ backgroundColor, username, logOut, history }) => (
    <header style={{ backgroundColor }}>
        <Link to="/">
            <h1>Store Destroyer</h1>
        </Link>
        <nav>
            {username &&
                <button onClick={() => {
                    logOut();
                    history.push('/login');
                }}>
                    Log out
                </button>
            }
        </nav>
        {username &&
            <div className="user-info">
                Hello, { username }
            </div>
        }
    </header>
);

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    username: state.currentUserName,
    backgroundColor: state.headerBackgroundColor,
});

export default withRouter(
    connect(mapStateToProps, { logOut })(Header)
);