import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand,
  faArrowAltCircleUp,
  faClock,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { formatLikeCurrency } from '../Utils/prettyPrint';

export const BlockTable = (blocks: any[], match: any) => {
  if (blocks.length === 0 || !blocks) {
    return null;
  }
  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth is-scrollable is-hoverable is-striped is-family-monospace">
        <thead>
          <tr>
            <th />
            <th className="block-height-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faArrowAltCircleUp} />
              </span>
              Height
            </th>
            <th className="block-hash-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faHashtag} />
              </span>
              Hash
            </th>
            <th className="block-timestamp-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faClock} />
              </span>
              Time
            </th>
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
              <td className="block-height-column">
                {formatLikeCurrency(block.height)}
              </td>
              <td className="block-hash-column">{block.hash}</td>
              <td className="block-timestamp-column">
                {new Date(block.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
