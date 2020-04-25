import React, { Component } from 'react';
import { Searchbar } from '../Components/Searchbar';
import axios from 'axios';
import { TransactionTable } from '../Components/TransactionTable';

type State = {
  results: any[];
  searching: boolean;
  history: string[];
};

type Props = {
  match: any;
};

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      searching: false,
      history: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    await this.getResults();

    this.addToHistory(match.params.query);
    if (match.query) {
      const { history } = this.state;
      this.setState({ history });
    }
  }

  async componentDidUpdate() {
    const { match } = this.props;
    const { history } = this.state;

    if (match.params.query && match.params.query !== history[0]) {
      this.addToHistory(match.params.query);
      await this.getResults();
    }
  }

  addToHistory(query: string) {
    const { history } = this.state;
    history.unshift(query);
    if (history.length > 10) {
      history.pop();
    }

    this.setState({
      history,
    });
  }

  async getResults() {
    this.setState({
      searching: true,
    });
    const { match } = this.props;
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/search`, {
      params: {
        query: match.params.query,
      },
    });
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
    const { results } = this.state;
    const { match } = this.props;

    return (
      <div className="container react-root">
        <header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="/">Karai Explorer</a>
              </li>
              <li
                className={match.params.query === undefined ? 'is-active' : ''}
              >
                <a href={`/search`}>Search</a>
              </li>
              {match.params.query !== undefined && (
                <li className="is-active">
                  <a href={`/search/${match.params.query}`}>
                    {decodeURIComponent(match.params.query)}
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Searchbar query={match.params.query} />
          {TransactionTable(results)}
        </main>
      </div>
    );
  }
}
