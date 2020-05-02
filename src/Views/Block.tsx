import React, { Component } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { Footer } from '../Components/Footer';

type State = {
  block: any;
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
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/blocks/${match.params.hash}`
    );
    console.log(res);
    this.setState({
      block: res.data.data,
    });
  }

  render() {
    const { block } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root Site">
        <Breadcrumbs match={match} />
        <main className="Site-content">
          <Searchbar query="" />
          {block.length > 0 && (
            <div
              className={`${
                darkMode ? 'monokai' : 'github'
              } highlight-wrapper block-details`}
            >
              <Highlight language="english">
                {JSON.stringify(block[0], null, 2)}
              </Highlight>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Block;
