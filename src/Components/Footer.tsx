import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type State = {};

type Props = {};

export class Footer extends Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="content has-text-right">
          <p>Designed for TurtleCoin® with <FontAwesomeIcon className="has-text-danger" icon={faHeart} /> by <a className="brand-link" href="https://logicbite.org/" target="__new" rel="noopener noreferrer">LogicBite LLC</a></p>
        </div>
      </footer>
    );
  }
}
