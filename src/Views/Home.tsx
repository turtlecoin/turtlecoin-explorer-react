import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { Searchbar } from '../Components/Searchbar';
import { TransactionTable } from '../Components/TransactionTable';
import { darkMode } from '../App';
import { Link } from 'react-router-dom';

type State = {
  pointers: any[];
  offset: number;
  loading: boolean;
};

type Props = {
  match: any;
};

class Root extends Component<Props, State> {
  state: State;
  interval: NodeJS.Timeout | null;
  expandRefs: any[];
  loadMoreRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointers: [],
      offset: 0,
      loading: false,
    };
    this.getPointers = this.getPointers.bind(this);
    this.interval = null;
    this.expandRefs = [];
  }

  async componentDidMount() {
    await this.getPointers();
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
        offset: offset - 10,
      });
      this.showTip();
      return;
    }
    const mergedPointers = [...pointers, ...res.data.data];
    this.setState({
      pointers: mergedPointers,
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
      <div className="container react-root">
        <header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li className="is-active">
                <Link to="/">Karai Explorer</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Searchbar query="" />
          {TransactionTable(pointers, match)}
          <br />
          {pointers.length > 0 && (
            <div
              className={`button ${darkMode ? 'is-black' : ''}`}
              ref={(ref) => (this.loadMoreRef = ref)}
              data-tip="No pointers found"
              data-type="error"
              onClick={() => {
                const { offset } = this.state;
                this.setState(
                  {
                    offset: offset + 10,
                  },
                  () => {
                    this.getPointers();
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

export default Root;
