import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

export const BlockTable = (blocks: any[], match: any) => {
  if ((blocks.length === 0 || !blocks) && match.path.includes('/search')) {
    return <p className="subtitle">No results found!</p>;
  }
  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth is-scrollable is-hoverable is-striped is-family-monospace">
        <thead>
          <tr>
            <th />
            <th className="block-height-column">Height</th>
            <th className="block-hash-column">Hash</th>
            <th className="block-timestamp-column">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block: any) => (
            <tr key={block.hash}>
              <td>
                <Link
                  to={`/blocks/${block.hash}`}
                  aria-label="expand more details"
                >
                  {' '}
                  <FontAwesomeIcon icon={faExpand} />
                </Link>
              </td>
              <td className="block-height-column">{block.height}</td>
              <td className="block-hash-column">{block.hash}</td>
              <td className="block-timestamp-column">
                {new Date(block.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
