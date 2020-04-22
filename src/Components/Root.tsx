import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import axios from 'axios';
import { routes } from '../Constants/routes';
import { Link, Route, Switch } from 'react-router-dom';
import Pointer from '../Views/Pointer';

type State = {
  pointers: [];
};

type Props = {};

class Root extends Component<Props, State> {
  state: State;
  interval: NodeJS.Timeout | null;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointers: [],
    };
    this.getPointers = this.getPointers.bind(this);
    this.interval = null;
  }

  async componentDidMount() {
    await this.getPointers();
    this.interval = setInterval(this.getPointers, 10000);
  }

  async componentWillUnmount() {
    clearInterval(this.interval!);
  }

  async getPointers() {
    const res = await axios.get(process.env.REACT_APP_API_URI + '/pointers');
    this.setState({
      pointers: res.data.data,
    });
  }

  render() {
    const { pointers } = this.state;

    return (
      <Switch>
        <Route
          exact
          path={routes.home}
          render={() => (
            <div className="container react-root">
              <h1 className="title">Karai Pointers</h1>
              {pointers.map((pointer: any) => (
                <Link
                  to={`/pointer/${pointer.hex}`}
                  key={pointer.hex}
                  className="highlight-wrapper atom-one-light"
                >
                  <Highlight language="english">
                    {JSON.stringify(pointer, null, 2)}
                  </Highlight>
                </Link>
              ))}
            </div>
          )}
        />
        <Route
          path={routes.pointer}
          render={({ match }) => {
            return <Pointer match={match} />;
          }}
        />
      </Switch>
    );
  }
}

export default Root;
