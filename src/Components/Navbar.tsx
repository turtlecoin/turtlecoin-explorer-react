import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { darkMode } from '../App';
import logo from '../Assets/turtlecoin_symbol.svg';
import logoWhite from '../Assets/turtlecoin_symbol_white.svg';

type Props = {};
type State = {
  expanded: boolean;
};

class Navbar extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    const { expanded } = this.state;
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
                <img
                  src={darkMode ? logoWhite : logo}
                  alt="TurtleCoin® logo"
                  width={30}
                  height={30}
                />
              </Link>

              <span
                role="button"
                className={`navbar-burger burger ${
                  expanded ? 'is-active' : ''
                }`}
                aria-label="menu"
                aria-expanded="false"
                onClick={() => {
                  const { expanded } = this.state;
                  this.setState({
                    expanded: !expanded,
                  });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </span>
            </div>

            <div className={`navbar-menu ${expanded ? 'is-active' : ''}`}>
              <div className="navbar-start">
                <Link
                  className="navbar-item"
                  to={'/pointers'}
                  onClick={() => {
                    this.setState({
                      expanded: false,
                    });
                  }}
                >
                  Pointers
                </Link>
                <Link
                  className="navbar-item"
                  to={'/blocks'}
                  onClick={() => {
                    this.setState({
                      expanded: false,
                    });
                  }}
                >
                  Blocks
                </Link>
                <Link
                  className="navbar-item"
                  to={'/transactions'}
                  onClick={() => {
                    this.setState({
                      expanded: false,
                    });
                  }}
                >
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
