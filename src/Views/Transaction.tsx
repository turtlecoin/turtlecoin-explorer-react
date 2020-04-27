import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Highlight from 'react-highlight.js';
import { Searchbar } from '../Components/Searchbar';
import { darkMode } from '../App';
import { Breadcrumbs } from '../Components/Breadcrumbs';

type State = {
  transaction: any;
  inputs: any[];
  outputs: any[];
};

type Props = {
  match: any;
};

class Transaction extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      transaction: [],
      inputs: [],
      outputs: [],
    };
    this.getTransaction = this.getTransaction.bind(this);
  }

  async componentDidMount() {
    const fetchFunctions = [
      this.getTransaction(),
      this.getInputs(),
      this.getOutputs(),
    ];
    Promise.all(fetchFunctions);
  }

  async getTransaction() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/transactions/${match.params.hash}`
    );
    console.log(res);
    this.setState({
      transaction: res.data.data,
    });
  }

  async getInputs() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/inputs/${match.params.hash}`
    );
    console.log(res);
    this.setState({
      inputs: res.data.data,
    });
  }

  async getOutputs() {
    const { match } = this.props;
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/outputs/${match.params.hash}`
    );
    console.log(res);
    this.setState({
      outputs: res.data.data,
    });
  }

  render() {
    const { transaction, inputs, outputs } = this.state;
    const { match } = this.props;
    return (
      <div className="container react-root">
        <Breadcrumbs match={match} />
        <main>
          <Searchbar query="" />
          {transaction.length > 0 && (
            <div
              className={`${
                darkMode ? 'monokai' : 'github'
              } highlight-wrapper transaction-details`}
            >
              <Highlight language="english">
                {JSON.stringify(transaction[0], null, 2)}
              </Highlight>
            </div>
          )}
          {inputs.length > 0 && (
            <Fragment>
              <h2 className="subtitle">Inputs</h2>
              <div
                className={`${
                  darkMode ? 'monokai' : 'github'
                } highlight-wrapper transaction-details`}
              >
                <Highlight language="english">
                  {JSON.stringify(inputs, null, 2)}
                </Highlight>
              </div>
            </Fragment>
          )}
          {outputs.length > 0 && (
            <Fragment>
              <h2 className="subtitle">Outputs</h2>
              <div
                className={`${
                  darkMode ? 'monokai' : 'github'
                } highlight-wrapper transaction-details`}
              >
                <Highlight language="english">
                  {JSON.stringify(outputs, null, 2)}
                </Highlight>
              </div>
            </Fragment>
          )}
        </main>
      </div>
    );
  }
}

export default Transaction;
