import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categoryActions/categoryActions';
import Loading from '../Loading/Loading';

class CategoryPane extends Component {
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    const {
      categories: { allCategories, isLoading }
    } = this.props;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <section className="main">
        <section className="sales">
          <button type="button" className="btn btn--gradient" id="show-category-modal">
            Create Category
          </button>
          <div className="table-wrapper">
            <table id="category-table" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map(category => {
                  return (
                    <tr key={category.category_id}>
                      <td>{category.category_id}</td>
                      <td>{category.category_name}</td>
                      <td data-id={category.category_id}>
                        <button type="button" className="blue">
                          Update
                        </button>
                        <button type="button" className="red">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => ({ categories: state.categories });

const mapActionsToProps = { getCategories: categoryActions.getCategories };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CategoryPane);
