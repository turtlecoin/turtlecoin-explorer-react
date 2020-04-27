import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { atomicToHuman } from '../Utils/atomicToHuman';
import { formatLikeCurrency } from '../Utils/formatLikeCurrency';

export const TransactionTable = (transactions: any[], match: any) => {
  if (
    (transactions.length === 0 || !transactions) &&
    match.path.includes('/search')
  ) {
    return <p className="subtitle">No results found!</p>;
  }
  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth is-scrollable is-hoverable is-striped is-family-monospace">
        <thead>
          <tr>
            <th />
            <th className="tx-hash-column">Hash</th>
            <th className="tx-amount-column">Amount</th>
            <th className="tx-fee-column">Fee</th>
            <th className="tx-size-column">Size</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx: any) => (
            <tr key={tx.hash}>
              <td>
                <Link
                  to={`/transactions/${tx.hash}`}
                  aria-label="expand more details"
                >
                  {' '}
                  <FontAwesomeIcon icon={faExpand} />
                </Link>
              </td>
              <td className="tx-hash-column">{tx.hash}</td>
              <td className="tx-amount-column">
                {formatLikeCurrency(atomicToHuman(tx.amount))}
              </td>
              <td className="tx-fee-column">
                {tx.fee < 0
                  ? '0.00'
                  : formatLikeCurrency(atomicToHuman(tx.fee))}
              </td>
              <td className="tx-size-column">{formatLikeCurrency(tx.size)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
