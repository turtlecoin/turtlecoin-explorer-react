import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  match: any;
};
type State = {};

export class Breadcrumbs extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    const pathParts = match.url.split('/');

    if (pathParts[0] === '' && pathParts[1] === '') {
      pathParts.pop();
    }

    return (
      <header>
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
                        {pathParts.indexOf(part) <= 1
                          ? part.charAt(0).toUpperCase() + part.slice(1)
                          : part}
                      </Link>
                    </li>
                  );
              }
            })}
          </ul>
        </nav>
      </header>
    );
  }
}
