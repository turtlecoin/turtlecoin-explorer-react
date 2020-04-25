import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { darkMode } from '../App';

type Props = {
  query: string;
};
type State = {
  query: string;
  error: boolean;
};

export class Searchbar extends Component<Props, State> {
  submitRef: any;
  inputRef: any;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      query:
        this.props.query === undefined
          ? ''
          : decodeURIComponent(this.props.query),
      error: false,
    };
  }

  render() {
    const { query, error } = this.state;
    return (
      <div className="field has-addons searchbar">
        <div className="control is-fullwidth">
          <input
            ref={(ref) => (this.inputRef = ref)}
            className={`input is-family-monospace ${error ? 'is-danger' : ''}`}
            type="text"
            placeholder="Search the explorer"
            value={query}
            onKeyDown={(event: any) => {
              if (event.key === 'Enter') {
                this.submitRef.click();
              }
              if (event.key === 'Escape') {
                this.inputRef.blur();
              }
            }}
            onChange={(event: any) => {
              const { error } = this.state;
              if (error && event.target.value.length > 0) {
                this.setState({
                  error: false,
                })
              }
              console.log(event.target.value);
              this.setState({
                query: event.target.value,
              });
            }}
          />
        </div>
        <div className="control">
          <Link
            ref={(ref) => (this.submitRef = ref)}
            className={`button ${darkMode ? 'is-black' : 'is-link'}`}
            to={`/search/${encodeURIComponent(query)}`}
            onClick={(event: any) => {
              const { query } = this.state;
              if (query.trim() === '') {
                event.preventDefault();
                this.setState({
                  error: true,
                });
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
