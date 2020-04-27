import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { TransactionTable } from '../Components/TransactionTable';

type State = {
  transactions: any[];
  offset: number;
  loading: boolean;
};

type Props = {
  match: any;
};

class Transactions extends Component<Props, State> {
  state: State;
  expandRefs: any[];
  loadMoreRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      transactions: [],
      offset: 0,
      loading: false,
    };
    this.getTransactions = this.getTransactions.bind(this);
    this.expandRefs = [];
  }

  async componentDidMount() {
    await this.getTransactions();
  }

  async getTransactions() {
    const { offset, transactions } = this.state;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/transactions`,
      {
        params: {
          offset,
        },
      }
    );
    if (res.data.data.length === 0) {
      this.setState({
        offset: offset - 10,
      });
      this.showTip();
      return;
    }
    const mergedTransactions = [...transactions, ...res.data.data];
    this.setState({
      transactions: mergedTransactions,
    });
  }

  async showTip() {
    ReactTooltip.show(this.loadMoreRef);
    await sleep(1000);
    ReactTooltip.hide(this.loadMoreRef);
  }

  render() {
    const { transactions } = this.state;
    const { match } = this.props;

    return (
      <div className="container react-root">
        <Breadcrumbs match={match} />
        <main>
          <Searchbar query="" />
          {TransactionTable(transactions, match)}
          <br />
          {transactions.length > 0 && (
            <div
              className={`button ${darkMode ? 'is-black' : ''}`}
              ref={(ref) => (this.loadMoreRef = ref)}
              data-tip="No transactions found"
              data-type="error"
              onClick={() => {
                const { offset } = this.state;
                this.setState(
                  {
                    offset: offset + 10,
                  },
                  () => {
                    this.getTransactions();
                  }
                );
              }}
            >
              Load More
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Transactions;
