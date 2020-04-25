import React, { Component } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';

type State = {
  pointer: any;
  searching: boolean;
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
      searching: false,
    };
  }

  async componentDidMount() {
    this.setState({
      searching: true,
    });
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/pointer/${match.params.hex}`
    );
    this.setState(
      {
        pointer: res.data.data,
      },
      () => {
        this.setState({
          searching: false,
        });
      }
    );
  }

  render() {
    const { pointer, searching } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root">
        <header>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="/">Karai Explorer</a>
              </li>
              <li className="is-active">
                <a href=".">{match.params.hex}</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Searchbar query="" />
          {pointer.length > 0 && (
            <div
              className={`${
                darkMode ? 'monokai' : 'github'
              } highlight-wrapper pointer-details`}
            >
              <Highlight language="english">
                {JSON.stringify(pointer[0], null, 2)}
              </Highlight>
            </div>
          )}
          {pointer.length === 0 && !searching && (
            <h2 className="subtitle">Nothing found here!</h2>
          )}
        </main>
      </div>
    );
  }
}

export default Pointer;
