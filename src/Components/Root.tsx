import React, { Component } from 'react';
import { routes } from '../Constants/routes';
import { Route, Switch } from 'react-router-dom';
import Pointer from '../Views/Pointer';
import Home from '../Views/Home';
import ReactTooltip from 'react-tooltip';
import { Search } from '../Views/Search';

type State = {
  pointers: any[];
  offset: number;
};

type Props = {
  className: string;
};

class Root extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = {
      pointers: [],
      offset: 0,
    };
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <ReactTooltip />
        <Switch>
          <Route
            exact
            path={routes.home}
            render={({ match }) => <Home match={match} />}
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
