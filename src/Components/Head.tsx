import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { darkMode } from '../App';

type Props = {
  match: any;
};

export class Head extends Component<Props> {
  render() {
    const { match } = this.props;
    const pathParts = match.url.split('/');

    if (pathParts[0] === '' && pathParts[1] === '') {
      pathParts.pop();
    }

    return (
      <Helmet>
        <title>
          {' '}
          {pathParts
            .map((part: string) => {
              switch (part) {
                case '':
                  return 'TurtleCoin® Block Explorer';
                default:
                  return `| ${
                    pathParts.indexOf(part) <= 1
                      ? part.charAt(0).toUpperCase() + part.slice(1)
                      : part
                  }`;
              }
            })
            .join(' ')}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={darkMode ? '#000000' : '#F5F5F5'} />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta
          name="description"
          content="A block explorer for TurtleCoin® that supports Karai pointer exploration."
        />
      </Helmet>
    );
  }
}
