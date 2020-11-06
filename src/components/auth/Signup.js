import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "./../../baseUrl";
import SweetAlert from "@sweetalert/with-react";
import { Link } from "react-router-dom";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      isLoading: false,
      isDisabled: false,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
  }
  handleRegistration = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (name == "" || email == "" || password == "") {
      return;
    }
    const data = {
      name,
      email,
      password,
    };
    this.setState({ isDisabled: true, isLoading: true });
    Axios.post(baseUrl + "/auth/register", data)
      .then((response) => {
        SweetAlert(
          <div style={{ color: "green" }}>
            <h1>
              {" "}
              <strong>Success!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>Signed up successfully.</p>
          </div>
        );
        this.props.history.push("/login");
      })
      .catch((error) => {
        this.setState({
          isDisabled: false,
          isLoading: false,
        });
        SweetAlert(
          <div style={{ color: "red" }}>
            <h1>
              {" "}
              <strong>Error!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>There is an error.</p>
          </div>
        );
      });
  };
  componentDidMount() {}

  render() {
    return (
      <>
        <div class='container register-form'>
          <div class='form'>
            <div class='form-content '>
              <div class='row'>
                <div class='col-md-6 offset-md-3'>
                  <div class='note mt-5'>
                    <h2 className='text-center'>Registration Form</h2>
                  </div>
                  <div class='form-group m-2 m-2'>
                    <input
                      type='text'
                      class='form-control'
                      placeholder='Your Name *'
                      value={this.state.name}
                      onChange={(e) => {
                        this.setState({ name: e.target.value });
                      }}
                    />
                  </div>
                  <div class='form-group m-2 m-2'>
                    <input
                      type='text'
                      class='form-control'
                      placeholder='Your Email *'
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </div>

                  <div class='form-group m-2'>
                    <input
                      type='password'
                      class='form-control'
                      placeholder='Your Password *'
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>
                  <div className='text-center'>
                    <button
                      type='button'
                      onClick={this.handleRegistration}
                      disabled={this.state.isDisabled}
                      class='btn btn-primary btn-block'
                    >
                      {this.state.isLoading ? "Wait..." : "Submit"}
                    </button>
                  </div>
                  <div className='text-center'>
                    Have Account <Link to='/login'>Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
