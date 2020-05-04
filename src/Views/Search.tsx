import React, { Component } from 'react';
import { Searchbar } from '../Components/Searchbar';
import axios from 'axios';
import { PointerTable } from '../Components/PointerTable';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { BlockTable } from '../Components/BlockTable';
import { TransactionTable } from '../Components/TransactionTable';
import { Footer } from '../Components/Footer';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head } from '../Components/Head';

type State = {
  results: any[];
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
    const { match } = this.props;
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/search`, {
      params: {
        query: match.params.query,
      },
    });
    this.setState({
      results: res.data.data,
    });
  }

  render() {
    const { results } = this.state;
    const { match } = this.props;

    const [pointers, blocks, transactions] = results;

    return (
      <div className="container react-root Site">
        <Head match={match} />
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query={match.params.query} />
          <div className="panel-wrapper">
            <div className="panel">
              <p className="panel-heading">
                <span className="panel-heading-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                Search Results
              </p>
              {pointers && PointerTable(pointers, match)}
              {blocks && BlockTable(blocks, match)}
              {transactions && TransactionTable(transactions, match)}
              {pointers &&
                pointers.length === 0 &&
                blocks &&
                blocks.length === 0 &&
                transactions &&
                transactions.length === 0 && (
                  <div className="message">
                    <p className="message-body">No results found!</p>
                  </div>
                )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
