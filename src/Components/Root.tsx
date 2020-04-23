import React, { Component } from 'react';
import Highlight from 'react-highlight.js';
import axios from 'axios';
import { routes } from '../Constants/routes';
import { Link, Route, Switch } from 'react-router-dom';
import Pointer from '../Views/Pointer';

type State = {
  pointers: any[];
  offset: number;
};

type Props = {};

class Root extends Component<Props, State> {
  state: State;
  interval: NodeJS.Timeout | null;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointers: [],
      offset: 0,
    };
    this.getPointers = this.getPointers.bind(this);
    this.interval = null;
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
      return;
    }
    const mergedPointers = [...pointers, ...res.data.data];
    this.setState({
      pointers: mergedPointers,
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
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li className="is-active">
                    <a href="/">Karai Explorer</a>
                  </li>
                </ul>
              </nav>
              {pointers.map((pointer: any) => (
                <Link
                  to={`/pointer/${pointer.hex}`}
                  key={pointer.hex}
                  className="highlight-wrapper github"
                >
                  <Highlight language="english">
                    {JSON.stringify(pointer, null, 2)}
                  </Highlight>
                </Link>
              ))}
              {pointers.length > 0 && (
                <div
                  className="button"
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
