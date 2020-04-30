import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';

type State = {
  transaction: any;
};

type Props = {
  match: any;
};

class Transaction extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      transaction: [],
    };
    this.getTransaction = this.getTransaction.bind(this);
  }

  async componentDidMount() {
    const fetchFunctions = [
      this.getTransaction(),
    ];
    Promise.all(fetchFunctions);
  }

  async getTransaction() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/transactions/${match.params.hash}`
    );
    this.setState({
      transaction: res.data.data,
    });
  }

  render() {
    const { transaction } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root">
        <Breadcrumbs match={match} />
        <main>
          <Searchbar query="" />
          {transaction.length > 0 && (
            <div
              className={`${
                darkMode ? 'monokai' : 'github'
              } highlight-wrapper transaction-details`}
            >
              <Highlight language="english">
                {JSON.stringify(transaction[0], null, 2)}
              </Highlight>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Transaction;
