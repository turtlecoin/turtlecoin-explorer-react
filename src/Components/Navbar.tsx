import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { darkMode } from '../App';

type Props = {};
type State = {};

class Navbar extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <nav
          className={`navbar ${darkMode ? 'is-black' : ''}`}
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                <h1 className="title">Explorer</h1>
              </Link>

              <span
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </span>
            </div>

            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to={'/'}>
                  Home
                </Link>
                <Link className="navbar-item" to={'/pointers'}>
                  Pointers
                </Link>
                <Link className="navbar-item" to={'/blocks'}>
                  Blocks
                </Link>
                <Link className="navbar-item" to={'/transactions'}>
                  Transactions
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
