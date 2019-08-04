import React, { Component } from "react";
import AddProduct from "./AddProduct";
import { connect } from "react-redux";
import EditProduct from "./EditProduct";
import {
  fetchProducts,
  deleteProducts,
} from "../actions/productActions";
import Pagination from "./Pagination";

class Home extends Component {
  //Initialize the state 
  state = {
    products: [],
    loading: true,
    editProduct: {
      id: "",
      name: "",
      description: "",
      price: "",
    },
    modal: false,
    pageOfItems: []
  };

  //Pagination Function
  onChangePage = pageOfItems => {
    this.setState({ pageOfItems: pageOfItems });
  };

  //Life Cycle Methods to call API
  componentDidMount() {
    this.setState({ loading: false });
    this.props.fetchProducts();
  }

  //Delete API Method
  onDelete = pId => {
    this.props.deleteProducts(pId);
  };

  //Handle onChange event
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Render method to display.
  render() {
    const renderProducts = this.state.pageOfItems.map(product => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td style={{ margin: 10 }}>
          <EditProduct productss={product} />
          <button
            className="btn btn-sm btn-danger"
            style={{ marginLeft: 5 }}
            onClick={() => this.onDelete(product.id)}>
            Delete Product
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <h1>Product List</h1>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">PRICE</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {renderProducts}
          </tbody>
        </table>
        <br />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
         <Pagination
            items={this.props.products}
            onChangePage={this.onChangePage}
          />
        </div>
        <AddProduct />
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});


export default connect(
  mapStateToProps,
  { fetchProducts, deleteProducts }
)(Home);


