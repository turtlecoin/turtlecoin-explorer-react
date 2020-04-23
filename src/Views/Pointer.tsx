import React, { Component } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';

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
      `${process.env.REACT_APP_API_URI}/pointer/${match.params.hex}`
    );
    this.setState({
      pointer: res.data.data,
    });
  }

  render() {
    const { pointer } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root">
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
        <div className="highlight-wrapper github">
          <Highlight language="english">
            {JSON.stringify(pointer[0], null, 2)}
          </Highlight>
        </div>
      </div>
    );
  }
}

export default Pointer;
