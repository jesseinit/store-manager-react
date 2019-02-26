import React from 'react';
import Util from '../../utils';

const TableRow = ({ latestsales = [] }) => {
  if (!latestsales.length) {
    return (
      <tr>
        <td colSpan="6">No sale has been recorded yet.</td>
      </tr>
    );
  }
  return latestsales.map((sale, index) => {
    return (
      <tr key={index}>
        <td colSpan="1">{Util.formatDate(sale.s_date)}</td>
        <td>{sale.s_description}</td>
        <td>{sale.s_qty}</td>
        <td>{Util.formatCurrency(sale.s_price)}</td>
        <td>{Util.formatCurrency(sale.s_total)}</td>
      </tr>
    );
  });
};

export default TableRow;
