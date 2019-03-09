import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as salesActions from '../../actions/salesActions/salesActions';
import Util from '../../utils';
import Loading from '../Loading/Loading';
import ToastContainer from '../Toasts/ToastContainer';
import Pagination from '../Pagination/Pagination';

class SalesRecordPane extends Component {
  componentDidMount() {
    this.props.populateSales();
  }

  render() {
    const {
      sales,
      sales: { salesMade, isLoading }
    } = this.props;
    console.log(this.props);
    if (isLoading) {
      return <Loading title="Fetching Sales Records" />;
    }
    return (
      <section className="main">
        <section className="sales">
          <ToastContainer message="" />
          {/* <div className="sales__meta">
            <div className="sort">
              <section className="filters">
                <form id="sort-date" className="filters__form">
                  <fieldset>
                    <legend>Date Range</legend>
                    <strong>From: </strong>
                    <input type="date" id="from-date" required />
                    <strong>To: </strong>
                    <input type="date" id="to-date" required />
                    <input type="submit" value="Retrieve Records" />
                  </fieldset>
                </form>
                <form id="sort-id" className="filters__form">
                  <fieldset>
                    <legend>By Sales ID</legend>
                    <input type="text" pattern="[0-9]*" id="sale-id" placeholder="Enter Sales ID" />
                    <input type="submit" value="Retrieve Records" />
                  </fieldset>
                </form>
                <form id="sort-user" className="filters__form">
                  <fieldset>
                    <legend>By Attendant</legend>
                    <select id="users-list">
                      <option value="0">Select User</option>
                    </select>
                    <input type="submit" value="Retrieve Records" />
                  </fieldset>
                </form>
                <button type="button" className="filters__clear" id="clear-filters-admin">
                  Clear filters
                </button>
              </section>
            </div>
          </div> */}
          <div className="table-wrapper">
            <table id="my-sales-table" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th colSpan="1">Date</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {salesMade.map((sale, index) => {
                  return (
                    <tr key={sale.s_id * index}>
                      <td>{sale.s_id}</td>
                      <td>{Util.formatDate(sale.s_date)}</td>
                      <td>{sale.s_description}</td>
                      <td>{sale.s_qty}</td>
                      <td>{Util.formatPrice(sale.s_price)}</td>
                      <td>{Util.formatCurrency(sale.s_total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {salesMade.length ? <Pagination entity={sales} allProps={this.props} /> : null}
        </section>
      </section>
    );
  }
}

const mapStateToProp = state => ({
  sales: state.sales
});

const mapActionsToProp = {
  populateSales: salesActions.populateSales,
  goToNextPage: salesActions.goToNextPage,
  goToPrevPage: salesActions.goToPrevPage
};

export default connect(
  mapStateToProp,
  mapActionsToProp
)(SalesRecordPane);
