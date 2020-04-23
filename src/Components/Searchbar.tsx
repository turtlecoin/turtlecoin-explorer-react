import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  query: string;
};
type State = {
  query: string;
};

export class Searchbar extends Component<State, Props> {
  submitRef: any;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      query: this.props.query || '',
    };
  }

  render() {
    const { query } = this.state;
    return (
      <div className="field has-addons searchbar">
        <div className="control is-fullwidth">
          <input
            className="input is-family-monospace"
            type="text"
            placeholder="Search the explorer"
            value={query}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter') {
                this.submitRef.click();
              }
            }}
            onChange={(event: any) => {
              this.setState({
                query: event.target.value,
              });
            }}
          />
        </div>
        <div className="control">
          <Link
            ref={(ref) => (this.submitRef = ref)}
            className="button is-info is-family-monospace"
            to={`/search/${query}`}
            onClick={(event: any) => {
              const { query } = this.state;
              if (query.trim() === '') {
                event.preventDefault();
              }
            }}
          >
            Search
          </Link>
        </div>
      </div>
    );
  }
}
