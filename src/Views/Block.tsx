import React, { Component } from 'react';
import axios from 'axios';
import { Head } from '../Components/Head';
import { Searchbar } from '../Components/Searchbar';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { Footer } from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faCube,
  faClock,
  faBalanceScale,
  faCodeBranch,
  faRandom,
  faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';
import { formatLikeCurrency } from '../Utils/prettyPrint';
import { getWindowDimensions } from '../Utils/getWindowDimensions';
import { TransactionTable } from '../Components/TransactionTable';

type State = {
  block: any;
  windowDimensions: any;
};

type Props = {
  match: any;
};

class Block extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      block: [],
      windowDimensions: getWindowDimensions(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount(): Promise<void> {
    window.addEventListener('resize', this.handleResize);
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/blocks/${match.params.hash}`
    );
    this.setState({
      block: res.data.data,
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
    const { block, windowDimensions } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root Site">
        <Head match={match} />
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          {block.map((row: any) => (
            <div key={row.hash}>
              <div className="panel-wrapper">
                <div className="panel is-hoverable is-family-monospace">
                  <p className="panel-heading">
                    <span className="panel-heading-icon">
                      <FontAwesomeIcon icon={faCube} />
                    </span>
                    {windowDimensions.width > 1023
                      ? row.hash
                      : row.hash.slice(0, 10)}
                  </p>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <FontAwesomeIcon icon={faArrowAltCircleUp} />
                    </span>
                    <span className="panel-label">
                      Height&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">
                      {formatLikeCurrency(row.height)}
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
                      <FontAwesomeIcon icon={faCodeBranch} />
                    </span>
                    <span className="panel-label">
                      Version&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">{`${row.major_version}.${row.minor_version}`}</span>
                  </div>
                  <div className="panel-block">
                    <span className="panel-icon">
                      <FontAwesomeIcon icon={faRandom} />
                    </span>
                    <span className="panel-label">
                      Nonce&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="panel-value">{row.nonce}</span>
                  </div>
                </div>
              </div>
              {row.transactions.length && (
                <div className="panel-wrapper">
                  <div className="panel">
                    <p className="panel-heading">
                      <span className="panel-heading-icon">
                        <FontAwesomeIcon icon={faHandHoldingUsd} />
                      </span>
                      Transactions
                    </p>
                    {TransactionTable(row.transactions, match)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Block;
