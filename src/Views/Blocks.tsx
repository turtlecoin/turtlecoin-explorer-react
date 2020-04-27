import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { BlockTable } from '../Components/BlockTable';

type State = {
  blocks: any[];
  blockTransactions: any[];
  offset: number;
  loading: boolean;
};

type Props = {
  match: any;
};

class Blocks extends Component<Props, State> {
  state: State;
  expandRefs: any[];
  loadMoreRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [],
      blockTransactions: [],
      offset: 0,
      loading: false,
    };
    this.getBlocks = this.getBlocks.bind(this);
    this.expandRefs = [];
  }

  async componentDidMount() {
    await this.getBlocks();
  }

  async getBlocks() {
    const { offset, blocks } = this.state;
    const res = await axios.get(`${process.env.REACT_APP_API_URI}/blocks`, {
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
    const mergedBlocks = [...blocks, ...res.data.data];
    this.setState({
      blocks: mergedBlocks,
    });
  }

  async showTip() {
    ReactTooltip.show(this.loadMoreRef);
    await sleep(1000);
    ReactTooltip.hide(this.loadMoreRef);
  }

  render() {
    const { blocks } = this.state;
    const { match } = this.props;

    return (
      <div className="container react-root">
        <Breadcrumbs match={match} />
        <main>
          <Searchbar query="" />
          {BlockTable(blocks, match)}
          <br />
          {blocks.length > 0 && (
            <div
              className={`button ${darkMode ? 'is-black' : ''}`}
              ref={(ref) => (this.loadMoreRef = ref)}
              data-tip="No blocks found"
              data-type="error"
              onClick={() => {
                const { offset } = this.state;
                this.setState(
                  {
                    offset: offset + 10,
                  },
                  () => {
                    this.getBlocks();
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

export default Blocks;
