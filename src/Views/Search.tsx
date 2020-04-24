import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import axios from 'axios';

type State = {
  results: any[];
  searching: boolean;
};

type Props = {
  match: any;
};

export class Search extends Component<Props, State> {
  state: State = {
    results: [],
    searching: false,
  };

  async componentDidMount() {
    this.setState({
      searching: true,
    });
    const { match } = this.props;
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/search`, {
      params: {
        query: match.params.query,
      },
    });
    console.log(res);
    this.setState(
      {
        results: res.data.data,
      },
      () => {
        this.setState({
          searching: false,
        });
      }
    );
  }

  render() {
    const { results, searching } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root">
        <header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="/">Karai Explorer</a>
              </li>
              <li className="is-active">
                <a href=".">Search</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Searchbar query={match.params.query} />
          <p>
            Search results for{' '}
            <strong>{decodeURIComponent(match.params.query)}</strong>
          </p>
          <div className="highlight-wrapper github pointer-details">
            {results.length > 0 && (
              <Highlight language="english">
                {JSON.stringify(results, null, 2)}
              </Highlight>
            )}

            {results.length === 0 && !searching && (
              <h2 className="subtitle">No results found! </h2>
            )}
          </div>
        </main>
      </div>
    );
  }
}
