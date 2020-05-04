import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { TransactionTable } from '../Components/TransactionTable';
import { client } from '..';
import { offsetIncrement } from '../Constants/config';
import { Footer } from '../Components/Footer';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type State = {
  transactions: any[];
  displayedTransactionCount: number;
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
      displayedTransactionCount: 0,
      offset: 0,
      loading: false,
    };
    this.getTransactions = this.getTransactions.bind(this);
    this.expandRefs = [];
  }

  async componentDidMount() {
    await this.getTransactions();

    client.onmessage = (message) => {
      const msg = JSON.parse(message.data as string);

      if (msg.type === 'tx') {
        const { transactions, displayedTransactionCount } = this.state;
        transactions.unshift(msg.message);

        while (transactions.length > displayedTransactionCount) {
          transactions.pop();
        }

        this.setState({
          transactions,
        });
      }
    };
  }

  async componentWillUnmount() {
    client.onmessage = () => {};
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
        offset: offset - offsetIncrement,
      });
      this.showTip();
      return;
    }
    const mergedTransactions = [...transactions, ...res.data.data];
    this.setState({
      transactions: mergedTransactions,
      displayedTransactionCount: mergedTransactions.length,
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
      <div className="container react-root Site">
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          <div className="panel">
            <p className="panel-heading">
              <span className="panel-heading-icon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              Transactions
            </p>
            {TransactionTable(transactions, match)}
          </div>
          <br />
          {transactions.length > 0 && (
            <div className="frame">
              <div
                className={`button ${darkMode ? 'is-black' : ''}`}
                ref={(ref) => (this.loadMoreRef = ref)}
                data-tip="No transactions found"
                data-type="error"
                onClick={() => {
                  const { offset } = this.state;
                  this.setState(
                    {
                      offset: offset + offsetIncrement,
                    },
                    () => {
                      this.getTransactions();
                    }
                  );
                }}
              >
                Load More
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Transactions;
