import React, { Component } from "react";
import { connect } from "react-redux";
import { editProducts } from '../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    //Initialize the state and constructor to call the parent class props
    this.state = {
      id: this.props.productss.id,
      name: this.props.productss.name,
      description: this.props.productss.description,
      price: this.props.productss.price,
      nameValid: false,
      descriptionValid: false,
      priceValid: false,
      modal: this.props.model,
      formErrors: { name: "", description: "", price: "" }

    };
  }

  //Toggle Method to open the modal popup
  toggle = () => {
    this.setState({
      modal: !this.state.modal,

    });
  }

  //Validation method
  validateField(fieldName, value) {
    let nameValid = this.state.nameValid;
    let descriptionValid = this.state.descriptionValid;
    let priceValid = this.state.priceValid;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case "name":
        nameValid = value.match(/^[A-Za-z ]*$/);
        fieldValidationErrors.name = nameValid ? " " : "Please enter only strings";
        break;
      case "description":
        descriptionValid = value.match(/^[A-Za-z ]*$/);
        fieldValidationErrors.description = descriptionValid ? " " : "Please enter only strings";
        break;
      case "price":
        priceValid = value.match(/^[0-9]*$/) && value.length <= 2;
        fieldValidationErrors.price = priceValid ? " " : "Please enter only number less than 100";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        descriptionValid: descriptionValid,
        priceValid: priceValid
      },
      this.validateForm
    );
  }

  // Update Method 
  updateProduct = (e) => {
    e.preventDefault();
    const product = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    }
    this.props.editProducts(product)
  }

  //Handle Change Event
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  //render Method to display
  render() {
    return (
      <>
        <Button className="btn btn-sm btn-info" onClick={this.toggle}>Edit Product</Button>
        <Modal isOpen={this.state.modal}>
          <form onSubmit={this.updateProduct}>
            <ModalHeader>Please Edit Product Details</ModalHeader>
            <ModalBody>
              <h5>Edit Details for ID :{this.state.id}</h5>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Name:</label>
                  <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Description:</label>
                  <input type="text" name="description" value={this.state.description} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.description}</p>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Price:</label>
                  <input type="text" name="price" value={this.state.price} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.price}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
              <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </>
    )
  }
}

export default connect(null, { editProducts })(EditProfile);