import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authService from '../../../services/authService';
import { getLocalStorage } from '../../../utils/storageUtil';
import { CURRENT_USER } from '../../../config/config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.currentUser = getLocalStorage(CURRENT_USER);
  }
  logOut(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <div>
        <header className="header">
          <div className="header-wrapper">
            <div className="logo">Live Users</div>
            <div className="currentUser">{`Hi ${this.currentUser?.userName || ''}`}</div>
            <div className="logo" style={{ cursor: 'pointer' }} onClick={this.logOut.bind(this)}>
              Logout
            </div>
          </div>
        </header>
      </div>
    );
  }
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authService), dispatch),
});

export default connect(null, mapDispatchToProps)(Header);
