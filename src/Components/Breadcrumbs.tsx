import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getWindowDimensions } from '../Utils/getWindowDimensions';

type Props = {
  match: any;
};
type State = {
  windowDimensions: any;
};

export class Breadcrumbs extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      windowDimensions: getWindowDimensions(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      windowDimensions: getWindowDimensions(),
    });
  }

  render() {
    const { match } = this.props;
    const { windowDimensions } = this.state;
    const pathParts = match.url.split('/');

    if (pathParts[0] === '' && pathParts[1] === '') {
      pathParts.pop();
    }

    return (
      <header>
        <div className="frame">
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul className="breadcrumb-list">
              {pathParts.map((part: string) => {
                switch (part) {
                  case '':
                    return (
                      <li
                        key={`breadcrumb-${part}`}
                        className={
                          pathParts.indexOf(part) === pathParts.length - 1
                            ? 'is-active'
                            : ''
                        }
                      >
                        <Link to="/">Explorer</Link>
                      </li>
                    );
                  default:
                    return (
                      <li
                        key={`breadcrumb-${part}`}
                        className={
                          pathParts.indexOf(part) === pathParts.length - 1
                            ? 'is-active'
                            : ''
                        }
                      >
                        <Link to={`/${part}`} className="breadcrumb-link">
                          {pathParts.indexOf(part) <= 1 &&
                            part.charAt(0).toUpperCase() + part.slice(1)}
                          {pathParts.indexOf(part) > 1 &&
                            (windowDimensions.width > 1023
                              ? part
                              : part.slice(0, 10))}
                        </Link>
                      </li>
                    );
                }
              })}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
