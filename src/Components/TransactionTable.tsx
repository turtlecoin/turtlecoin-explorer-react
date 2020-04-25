import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

export const TransactionTable = (pointers: any[]) => {
  if (pointers.length === 0 || !pointers) {
    return <p className="subtitle">No results found!</p>;
  }
  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth is-scrollable is-hoverable is-striped is-family-monospace">
        <thead>
          <tr>
            <th />
            <th className="ascii-column">ASCII</th>
            <th className="hex-column">Hex</th>
            <th className="timestamp-column">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {pointers.map((pointer: any) => (
            <tr key={pointer.hex}>
              <td>
                <Link
                  to={`/pointer/${pointer.hex}`}
                  aria-label="expand more details"
                >
                  {' '}
                  <FontAwesomeIcon icon={faExpand} />
                </Link>
              </td>
              <td className="ascii-column">{pointer.ascii}</td>
              <td className="hex-column">
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
              <td className="timestamp-column">
                {new Date(pointer.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
