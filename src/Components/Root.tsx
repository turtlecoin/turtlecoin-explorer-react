import React, { Component } from 'react';
import axios from 'axios';
import { routes } from '../Constants/routes';
import { Route, Switch, Link } from 'react-router-dom';
import Pointer from '../Views/Pointer';
import ReactTooltip from 'react-tooltip';
import { sleep } from '../Utils/sleep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { Searchbar } from './Searchbar';
import { Search } from '../Views/Search';

type State = {
  pointers: any[];
  offset: number;
};

type Props = {};

class Root extends Component<Props, State> {
  state: State;
  interval: NodeJS.Timeout | null;
  loadMoreRef: any;
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

    return (
      <div>
        <ReactTooltip className="opaque" />

        <Switch>
          <Route
            exact
            path={routes.home}
            render={() => (
              <div className="container react-root">
                <header>
                  <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                      <li className="is-active">
                        <a href="/">
                          <h2 className="subtitle">Karai Explorer</h2>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </header>
                <main>
                  <Searchbar query="" />
                  <table className="table is-fullwidth">
                    <thead>
                      <tr>
                        <th />
                        <th>ASCII</th>
                        <th>Hex</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointers.map((pointer: any) => (
                        <tr>
                          <td>
                            <Link
                              to={`/pointer/${pointer.hex}`}
                              aria-label="expand more details"
                            >
                              {' '}
                              <FontAwesomeIcon icon={faExpand} />
                            </Link>
                          </td>
                          <td>{pointer.ascii}</td>
                          <td>{pointer.hex}</td>
                          <td>
                            {new Date(pointer.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pointers.length > 0 && (
                    <div
                      className="button"
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
            )}
          />
          <Route
            path={routes.pointer}
            render={({ match }) => {
              return <Pointer match={match} />;
            }}
          />
          <Route
            path={routes.search}
            render={({ match }) => {
              return <Search match={match} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Root;
