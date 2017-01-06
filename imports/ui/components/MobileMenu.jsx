import React from 'react';
// XXX: no session!
import { Session } from 'meteor/session';

class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    Session.set('menuOpen', !Session.get('menuOpen'));
  }

  render() {
    return (
      <div className="nav-group">
        <a href="#toggle-menu" className="nav-item" onClick={this.toggleMenu}>
          <span
            className="icon-list-unordered"
            title="show menu"
          />
        </a>
      </div>
    );
  }
}

export default MobileMenu;
