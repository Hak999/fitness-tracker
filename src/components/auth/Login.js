import React, { Component } from "react";
import Axios from "axios";
import SweetAlert from "@sweetalert/with-react";
import { baseUrl } from "./../../baseUrl";
import { Link } from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      isDisabled: false,
    };
    this.handleRegistration = this.handleRegistration.bind(this);
  }
  handleRegistration = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email == "" || password == "") {
      return;
    }
    const data = {
      email,
      password,
    };
    this.setState({ isDisabled: true, isLoading: true });
    Axios.post(baseUrl + "/auth/login", data)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuth", true);
        this.props.history.push("/");
      })
      .catch((error) => {
        SweetAlert(
          <div style={{ color: "red" }}>
            <h1>
              {" "}
              <strong>Error!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>Invalid Crednetials</p>
          </div>
        );
        this.setState({
          isDisabled: false,
          isLoading: false,
        });
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
                    <h2 className='text-center'>Login Form</h2>
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
                    Don't Have Account Create one{" "}
                    <Link to='/signup'>Register</Link>
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
