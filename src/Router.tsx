import React, { Component } from 'react';
import { routes } from './Constants/routes';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Pointer from './Views/Pointer';
import Pointers from './Views/Pointers';
import Block from './Views/Block';
import Blocks from './Views/Blocks';
import Transaction from './Views/Transaction';
import Transactions from './Views/Transactions';
import ReactTooltip from 'react-tooltip';
import { Search } from './Views/Search';

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
        <Navbar />
        <ReactTooltip />
        <Switch>
          <Route
            exact
            path={routes.home}
            render={({ match }) => <Blocks match={match} />}
          />
          <Route
            path={routes.pointer}
            render={({ match }) => {
              return <Pointer match={match} />;
            }}
          />
          <Route
            path={routes.pointers}
            render={({ match }) => {
              return <Pointers match={match} />;
            }}
          />
          <Route
            exact
            path={routes.block}
            render={({ match }) => <Block match={match} />}
          />
          <Route
            exact
            path={routes.blocks}
            render={({ match }) => <Blocks match={match} />}
          />
          <Route
            exact
            path={routes.transaction}
            render={({ match }) => <Transaction match={match} />}
          />
          <Route
            exact
            path={routes.transactions}
            render={({ match }) => <Transactions match={match} />}
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
