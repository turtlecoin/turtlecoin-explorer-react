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
      `https://karai.extrahash.org/pointer/${match.params.hash}`
    );
    this.setState({
      pointer: res.data.data,
    });
  }

  render() {
    const { pointer } = this.state;
    return (
      <div className="container react-root">
        <h1 className="title">{pointer[0] && pointer[0].hash}</h1>
        <div className=" highlight-wrapper atom-one-light">
          <Highlight language="english">
            {JSON.stringify(pointer[0], null, 2)}
          </Highlight>
        </div>
      </div>
    );
  }
}

export default Pointer;
