import React, { Component } from 'react';
import axios from 'axios';
import { Searchbar } from '../Components/Searchbar';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { Footer } from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingUsd,
  faCodeBranch,
  faLink,
  faClock,
  faCube,
} from '@fortawesome/free-solid-svg-icons';
import { getWindowDimensions } from '../Utils/getWindowDimensions';
import { Head } from '../Components/Head';

type State = {
  pointer: any;
  windowDimensions: any;
};

type Props = {
  match: any;
};

class Pointer extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointer: [],
      windowDimensions: getWindowDimensions(),
    };
    this.handleResize = this.handleResize.bind(this);
  }

  async componentDidMount(): Promise<void> {
    window.addEventListener('resize', this.handleResize);
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/pointers/${match.params.hex}`
    );
    this.setState({
      pointer: res.data.data,
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
    const { pointer, windowDimensions } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root Site">
        <Head match={match} />
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          {pointer.map((row: any) => (
            <div className="panel-wrapper" key={row.hex}>
              <div className="panel is-hoverable is-family-monospace">
                <p className="panel-heading">
                  <span className="panel-heading-icon">
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </span>
                  {row.hex}
                </p>
                <div className="panel-block">
                  <span className="panel-icon">
                    <FontAwesomeIcon icon={faLink} />
                  </span>
                  <span className="panel-label">
                    Link&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    <a
                      href={row.ascii}
                      target="__blank"
                      rel="noopener noreferrer"
                    >
                      {row.ascii}
                    </a>
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
                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                  </span>
                  <span className="panel-label">
                    Transaction&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  <span className="panel-value">
                    <a href={`/transactions/${row.transaction}`}>
                      {windowDimensions.width > 1023
                        ? row.transaction
                        : row.transaction.slice(0, 10)}
                    </a>
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

export default Pointer;
