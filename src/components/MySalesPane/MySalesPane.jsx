import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import salesRecordIcon from '../../assets/img/sales-rec-icon.png';
import productSoldIcon from '../../assets/img/product-sold-icon.png';
import productWorthIcon from '../../assets/img/product-worth-icon.png';
import * as salesActions from '../../actions/salesActions/salesActions';
import Loading from '../Loading/Loading';
import Util from '../../utils';

class MySalesPane extends Component {
  componentDidMount() {
    const { populateSales, populateDashboard } = this.props;
    populateSales('Attendant');
    populateDashboard('Attendant');
  }

  render() {
    const {
      sales: {
        misc: { totalsaleorder, totalproductsold, totalproductworth },
        salesMade,
        isLoading
      }
    } = this.props;

    if (isLoading) {
      return <Loading title="Fetching My Sales" />;
    }

    return (
      <section className="main">
        <section className="summary">
          <div className="summary__card">
            <div className="details">
              <p className="header">Sales Order Processed</p>
              <h2 className="value" id="total-sales-orders">
                {totalsaleorder}
              </h2>
            </div>
            <div className="icon yellow">
              <img src={salesRecordIcon} alt="card-icon" />
            </div>
          </div>

          <div className="summary__card">
            <div className="details">
              <p className="header">Total Products Sold</p>
              <h2 className="value" id="total-prod-sold">
                {totalproductsold}
              </h2>
            </div>
            <div className="icon red">
              <img src={productSoldIcon} alt="card-icon" />
            </div>
          </div>

          <div className="summary__card">
            <div className="details">
              <p className="header">Product Worth Sold</p>
              <h2 className="value" id="total-prod-worth">
                {Util.formatCurrency(totalproductworth)}
              </h2>
            </div>
            <div className="icon green">
              <img src={productWorthIcon} alt="card-icon" />
            </div>
          </div>
        </section>
        <section className="sales">
          <div className="filters">
            <form id="sort-id" className="filters__form">
              <fieldset>
                <legend>By Sales ID</legend>
                <input type="text" pattern="[0-9]*" id="sale-id" placeholder="Enter Sales ID" />
                <input type="submit" value="Retrieve Records" />
              </fieldset>
            </form>
            <button type="button" className="filters__clear" id="clear-filters-attendant">
              Clear Filters
            </button>
          </div>
          <div className="table-wrapper">
            <table id="my-sales-table" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th colSpan="1">Date</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className="total">Total</th>
                </tr>
              </thead>
              <tbody>
                {salesMade.length ? (
                  salesMade.map(sale => {
                    return (
                      <tr key={sale.s_id}>
                        <td>{sale.s_id}</td>
                        <td>{Util.formatDate(sale.s_date)}</td>
                        <td>{sale.s_description}</td>
                        <td>{sale.s_qty}</td>
                        <td>{sale.s_price}</td>
                        <td>{Util.formatCurrency(sale.s_total)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">You have not made any sales yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    );
  }
}

MySalesPane.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  sales: PropTypes.oneOfType([PropTypes.object]).isRequired,
  populateSales: PropTypes.func.isRequired,
  populateDashboard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  sales: state.sales
});

const mapActionsToProps = {
  populateSales: salesActions.populateSales,
  populateDashboard: salesActions.populateDashboard
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(MySalesPane);
