import React, { Component } from "react";
import Navbar from "./../pages/Navbar";
import Axios from "axios";
import { baseUrl } from "./../../baseUrl";
import SweetAlert from "@sweetalert/with-react";
export default class AddWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      token: null,
    };
    this.handleWorkoutAdd = this.handleWorkoutAdd.bind(this);
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({
      token,
    });
  }
  handleWorkoutAdd = (e) => {
    const { name, token } = this.state;
    if (name == "") {
      return;
    }
    const data = {
      name,
    };
    this.setState({ isDisabled: true, isLoading: true });
    Axios.post(baseUrl + "/excercise/addworkout", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        SweetAlert(
          <div style={{ color: "green" }}>
            <h1>
              {" "}
              <strong>Success!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>Workout Plan Added successfully.</p>
          </div>
        );
        this.props.history.push("/");
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
            <p style={{ fontSize: "20px" }}>Invalid Parameters Provided</p>
          </div>
        );
      });
  };
  render() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
    return (
      <>
        <Navbar />
        <div>
          <div class='container register-form'>
            <div class='form'>
              <div class='form-content '>
                <div class='row'>
                  <div class='col-md-6 offset-md-3'>
                    <div class='note mt-5'>
                      <h2 className='text-center'>New Workout Plan Form</h2>
                    </div>

                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Workout Plan Name *'
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                    </div>

                    <div className='text-center'>
                      <button
                        type='button'
                        onClick={this.handleWorkoutAdd}
                        disabled={this.state.isDisabled}
                        class='btn btn-primary btn-block'
                      >
                        {this.state.isLoading
                          ? "Wait..."
                          : "Add New Workout Plan"}
                      </button>
                    </div>
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
