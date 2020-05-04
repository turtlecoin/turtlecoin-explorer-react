import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { Searchbar } from '../Components/Searchbar';
import { PointerTable } from '../Components/PointerTable';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { client } from '..';
import { offsetIncrement } from '../Constants/config';
import { Footer } from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

type State = {
  pointers: any[];
  offset: number;
  displayedPointerCount: number;
  loading: boolean;
};

type Props = {
  match: any;
};

class Pointers extends Component<Props, State> {
  state: State;
  expandRefs: any[];
  loadMoreRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointers: [],
      displayedPointerCount: 0,
      offset: 0,
      loading: false,
    };
    this.getPointers = this.getPointers.bind(this);
    this.expandRefs = [];
  }

  async componentDidMount() {
    await this.getPointers();

    client.onmessage = (message) => {
      const msg = JSON.parse(message.data as string);

      if (msg.type === 'pointer') {
        const { pointers, displayedPointerCount } = this.state;
        pointers.unshift(msg.message);

        while (pointers.length > displayedPointerCount) {
          pointers.pop();
        }

        this.setState({
          pointers,
        });
      }
    };
  }

  async componentWillUnmount() {
    client.onmessage = () => {};
  }

  async getPointers() {
    const { offset, pointers } = this.state;
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/pointers`, {
      params: {
        offset,
      },
    });
    if (res.data.data.length === 0) {
      this.setState({
        offset: offset - offsetIncrement,
      });
      this.showTip();
      return;
    }
    const mergedPointers = [...pointers, ...res.data.data];
    this.setState({
      pointers: mergedPointers,
      displayedPointerCount: mergedPointers.length,
    });
  }

  async showTip() {
    ReactTooltip.show(this.loadMoreRef);
    await sleep(1000);
    ReactTooltip.hide(this.loadMoreRef);
  }

  render() {
    const { pointers } = this.state;
    const { match } = this.props;

    return (
      <div className="container react-root Site">
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          <div className="panel">
            <p className="panel-heading">
              <span className="panel-heading-icon">
                <FontAwesomeIcon icon={faCodeBranch} />
              </span>
              Pointers
            </p>
            {PointerTable(pointers, match)}
          </div>
          <br />
          {pointers.length > 0 && (
            <div className="frame">
              <div
                className={`button ${darkMode ? 'is-black' : ''}`}
                ref={(ref) => (this.loadMoreRef = ref)}
                data-tip="No pointers found"
                data-type="error"
                onClick={() => {
                  const { offset } = this.state;
                  this.setState(
                    {
                      offset: offset + offsetIncrement,
                    },
                    () => {
                      this.getPointers();
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

export default Pointers;
