import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from '../Components/Searchbar';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { Footer } from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube,
  faClock,
  faBalanceScale,
  faHandHoldingUsd,
  faCoins,
  faTag,
  faCertificate,
  faDollarSign,
  faKey,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { formatLikeCurrency, prettyPrint } from '../Utils/prettyPrint';
import { getWindowDimensions } from '../Utils/getWindowDimensions';

type State = {
  transaction: any;
  windowDimensions: any;
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
      windowDimensions: getWindowDimensions(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount(): Promise<void> {
    window.addEventListener('resize', this.handleResize);
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/transactions/${match.params.hash}`
    );
    this.setState({
      transaction: res.data.data,
    });
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
    const { transaction, windowDimensions } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root Site">
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          {transaction.map((row: any) => (
            <div className="panel-wrapper" key={row.hash}>
              <div className="panel is-hoverable is-family-monospace">
                <p className="panel-heading">
                  <span className="panel-heading-icon">
                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                  </span>
                  {windowDimensions.width > 1023
                    ? row.hash
                    : row.hash.slice(0, 10)}
                </p>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faCoins} />
                  </span>
                  <span className="panel-label">
                    Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    {prettyPrint(row.amount)} TRTL
                  </span>
                </div>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  <span className="panel-label">
                    Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    {new Date(row.timestamp * 1000).toLocaleString()}
                  </span>
                </div>
                {row.payment_id && (
                  <div className="panel-block">
                    <span className="panel-icon">
                      <FontAwesomeIcon icon={faTag} />
                    </span>
                    <span className="panel-label">
                      Payment ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">
                      <a href={`/search/${row.payment_id}`}>
                        {windowDimensions.width > 1023
                          ? row.payment_id
                          : row.payment_id.slice(0, 10)}
                      </a>
                    </span>
                  </div>
                )}
                {row.fee < 0 && (
                  <div className="panel-block">
                    <span className="panel-icon">
                      <FontAwesomeIcon icon={faCertificate} />
                    </span>
                    <span className="panel-label">
                      Coin Birth&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">
                      {prettyPrint(Math.abs(row.fee))} TRTL
                    </span>
                  </div>
                )}
                {row.fee > 0 && (
                  <div className="panel-block">
                    <span className="panel-icon">
                      <FontAwesomeIcon icon={faDollarSign} />
                    </span>
                    <span className="panel-label">
                      Fee&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">
                      {prettyPrint(row.fee)} TRTL
                    </span>
                  </div>
                )}
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faBalanceScale} />
                  </span>
                  <span className="panel-label">
                    Size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    {formatLikeCurrency(row.size)} bytes
                  </span>
                </div>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faUnlock} />
                  </span>
                  <span className="panel-label">
                    Unlock Time&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">{row.unlock_time}</span>
                </div>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                  <span className="panel-label">
                    Public Key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    {windowDimensions.width > 1023
                      ? row.public_key
                      : row.public_key.slice(0, 10)}
                  </span>
                </div>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faCube} />
                  </span>
                  <span className="panel-label">
                    Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    <a href={`/blocks/${row.block}`}>
                      {windowDimensions.width > 1023
                        ? row.block
                        : row.block.slice(0, 10)}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Transaction;
