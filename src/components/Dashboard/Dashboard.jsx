import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as salesActions from '../../actions/salesActions/salesActions';
import { logOutUser } from '../../actions/authActions/authActions';
import Util from '../../utils';
import './Dashboard.scss';
import salesRecordIcon from '../../assets/img/sales-rec-icon.png';
import productSoldIcon from '../../assets/img/product-sold-icon.png';
import productWorthIcon from '../../assets/img/product-worth-icon.png';
import categoryIcon from '../../assets/img/catergory-icon.png';
import employeeIcon from '../../assets/img/employee-icon.png';
import Loading from '../Loading/Loading';
import TableRow from '../TableRow/TableRow';

export class DashboardContent extends Component {
  componentDidMount() {
    const { populateDashboard } = this.props;
    populateDashboard();
  }

  render() {
    const {
      auth: { isAuthenticated },
      sales: {
        misc: {
          latestsales,
          totalsaleorder,
          totalproductsold,
          totalproductworth,
          totalproducts,
          totalcategory,
          totalemployee
        },
        isLoading
      }
    } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (isLoading) {
      return <Loading title="Populating Dashboard" />;
    }

    return (
      <div className="main">
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
          <div className="summary">
            <div className="admin-sales">
              <div className="sales__meta">
                <h3 className="header">Last 5 Sales Orders</h3>
              </div>
              <div className="table-wrapper no-flow">
                <table className="table" id="lastest-sales">
                  <thead>
                    <tr>
                      <th colSpan="1">Date</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow latestsales={latestsales} />
                  </tbody>
                </table>
              </div>
            </div>
            <div className="prod-cat-summary">
              <div className="sales__meta">
                <h3 className="header">Miscellaneous</h3>
              </div>
              <div className="summary__card">
                <div className="details">
                  <p className="header">No of Products</p>
                  <h2 className="value" id="total-products">
                    {totalproducts}
                  </h2>
                </div>
                <div className="icon green">
                  <img src={salesRecordIcon} alt="card-icon" />
                </div>
              </div>
              <div className="summary__card">
                <div className="details">
                  <p className="header">No of Categories</p>
                  <h2 className="value" id="total-categories">
                    {totalcategory}
                  </h2>
                </div>
                <div className="icon yellow">
                  <img src={categoryIcon} alt="card-icon" />
                </div>
              </div>
              <div className="summary__card">
                <div className="details">
                  <p className="header">No of Employees</p>
                  <h2 className="value" id="total-staff">
                    {totalemployee}
                  </h2>
                </div>
                <div className="icon red">
                  <img src={employeeIcon} alt="card-icon" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

DashboardContent.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object]).isRequired,
  sales: PropTypes.oneOfType([PropTypes.object]).isRequired,
  populateDashboard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sales: state.sales,
  auth: state.auth
});

const mapActionsToProps = {
  populateDashboard: salesActions.populateDashboard,
  logOutUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(DashboardContent);
