import React, { Component } from "react";
import { connect } from "react-redux";
import { addProducts } from '../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    //Initialize the state and constructor to call the parent class props
    this.state = {
      id: "",
      name: "",
      description: "",
      price: "",
      idValid: false,
      nameValid: false,
      descriptionValid: false,
      priceValid: false,
      modal: this.props.model,
      formErrors: { id: "", name: "", description: "", price: "" },
      formValid: false
    };
  }

  //Handle Change Method
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  //Toggle Method to open the modal popup
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      id: "",
      name: "",
      description: "",
      price: "",

    });
  }

  //Validate Form Fields
  validateField(fieldName, value) {
    let idValid = this.state.idValid;
    let nameValid = this.state.nameValid;
    let descriptionValid = this.state.descriptionValid;
    let priceValid = this.state.priceValid;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case "id":
        idValid = value.match(/^[0-9]*$/) && value.length === 2;
        fieldValidationErrors.id = idValid ? " " : "Please enter only number less than 100";
        break;
      case "name":
        nameValid = value.match(/^[A-Za-z ]*$/);
        fieldValidationErrors.name = nameValid ? " " : "Please enter only strings";
        break;
      case "description":
        descriptionValid = value.match(/^[A-Za-z ]*$/);
        fieldValidationErrors.description = descriptionValid ? " " : "Please enter only strings";
        break;
      case "price":
        priceValid = value.match(/^[0-9]*$/) && value.length === 2;
        fieldValidationErrors.price = priceValid ? " " : "Please enter only two digit numbers";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        idValid: idValid,
        nameValid: nameValid,
        descriptionValid: descriptionValid,
        priceValid: priceValid
      },
      this.validateForm
    );
  }
  //Method to disable the button
  validateForm() {
    this.setState({
      formValid: this.state.idValid && this.state.nameValid && this.state.descriptionValid && this.state.priceValid
    });
  }

  //Submit Method
  handleSubmit = e => {
    e.preventDefault();
    const product = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
    }
    this.props.addProducts(product)
    this.setState({ modal: !this.state.modal })
  };

  //render Method to display
  render() {
    return (
      <div style={{ margin: 20 }}>
        <Button color="success" onClick={this.toggle}>Add Product</Button>
        <Modal isOpen={this.state.modal}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader>Please Add Product Details</ModalHeader>
            <ModalBody>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>ID:</label>
                  <input type="text" name="id" value={this.state.id} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.id}</p>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Name:</label>
                  <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.name}</p>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Description:</label>
                  <input type="text" name="description" value={this.state.description} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.description}</p>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label>Price:</label>
                  <input type="text" name="price" value={this.state.price} onChange={this.handleChange} className="form-control" />
                  <p>{this.state.formErrors.price}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <input type="submit" value="Submit" className="btn btn-primary" disabled={!this.state.formValid} />
              <Button className="btn btn-warning" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>

    );
  }
}

export default connect(null, { addProducts })(AddProduct);
