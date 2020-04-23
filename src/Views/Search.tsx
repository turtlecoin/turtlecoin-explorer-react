import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';

type State = {};

type Props = {
  match: any;
};

export class Search extends Component<Props, State> {
  render() {
    const { match } = this.props;
    return (
      <div className="container react-root">
        <header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <h2 className="subtitle">
                  <a href="/">Karai Explorer</a>
                </h2>
              </li>
              <li className="is-active">
                <h2 className="subtitle">
                  <a href=".">Search</a>
                </h2>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Searchbar query={match.params.query} />
          <div className="highlight-wrapper github pointer-details">
            <Highlight language="english">
              {JSON.stringify(match, null, 2)}
            </Highlight>
          </div>
        </main>
      </div>
    );
  }
}
