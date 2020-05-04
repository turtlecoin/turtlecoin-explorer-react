import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand,
  faLink,
  faCodeBranch,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export const PointerTable = (pointers: any[], match: any) => {
  if (pointers.length === 0 || !pointers) {
    return null;
  }
  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth is-scrollable is-hoverable is-striped is-family-monospace">
        <thead>
          <tr>
            <th />
            <th className="pointer-ascii-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faLink} />
              </span>
              Link
            </th>
            <th className="pointer-hex-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faCodeBranch} />
              </span>
              Hex
            </th>
            <th className="pointer-timestamp-column">
              <span className="table-header-icon">
                <FontAwesomeIcon icon={faClock} />
              </span>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {pointers.map((pointer: any) => (
            <tr key={pointer.hex}>
              <td>
                <Link
                  to={`/pointers/${pointer.hex}`}
                  aria-label="expand more details"
                >
                  {' '}
                  <FontAwesomeIcon icon={faExpand} />
                </Link>
              </td>
              <td className="pointer-ascii-column">
                <a
                  href={pointer.ascii}
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  {pointer.ascii}
                </a>
              </td>
              <td className="pointer-hex-column">
                <span className="translucent pointer-text-piece">
                  {pointer.hex.substring(0, 8)}
                </span>
                <span className="pointer-text-piece">
                  {pointer.hex.substring(8, 20)}
                </span>
                <span className="translucent pointer-text-piece">
                  {pointer.hex.substring(20, 22)}
                </span>
              </td>
              <td className="pointer-timestamp-column">
                {new Date(pointer.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
