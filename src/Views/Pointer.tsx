import React, { Component } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';
import { Footer } from '../Components/Footer';

type State = {
  pointer: any;
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
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/pointers/${match.params.hex}`
    );
    this.setState({
      pointer: res.data.data,
    });
  }

  render() {
    const { pointer } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root Site">
        <Breadcrumbs match={match} />
        <main className="Site-content">
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
        </main>
        <Footer />
      </div>
    );
  }
}

export default Pointer;
