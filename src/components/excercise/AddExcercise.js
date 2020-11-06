import React, { Component } from "react";
import Navbar from "./../pages/Navbar";
import Axios from "axios";
import { baseUrl } from "./../../baseUrl";
import SweetAlert from "@sweetalert/with-react";

export default class AddExcercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      workouts: [],
      name: "",
      type: "",
      weight: "",
      sets: "",
      reps: "",
      duration: "",
      distance: "",
      workoutId: null,
      isError: false,
      error: null,
    };
    this.handleExcerciseAdd = this.handleExcerciseAdd.bind(this);
  }
  handleExcerciseAdd = (e) => {
    e.preventDefault();
    this.setState({ isDisabled: true, isLoading: true });
    const {
      name,
      type,
      weight,
      sets,
      reps,
      duration,
      distance,
      workoutId,
      token,
    } = this.state;
    console.log(workoutId);
    const data = {
      name,
      type,
      weight,
      sets,
      reps,
      duration,
      distance,
      workoutId,
    };
    this.setState({ isDisabled: true, isLoading: true });
    Axios.post(baseUrl + "/excercise/addExcercise", data, {
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
            <p style={{ fontSize: "20px" }}>Excercise Added successfully.</p>
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
            <p style={{ fontSize: "20px" }}>{error.response.data}</p>
          </div>
        );
      });
  };
  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({
      token,
    });
    Axios.get(baseUrl + "/excercise/getWorkouts", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        this.setState({
          workouts: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
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
                      <h2 className='text-center'>Add New Excercise</h2>
                    </div>
                    <div class='form-group m-2'>
                      <select
                        class='form-control mb-1'
                        onChange={(e) => {
                          this.setState({
                            workoutId: e.target.value,
                          });
                        }}
                      >
                        <option value=''>Choose Workout Plan Name</option>
                        {this.state.workouts.map((workout) => {
                          return (
                            <option key={workout._id} value={workout._id}>
                              {workout.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Excercise Name *'
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
                        placeholder='Excercise Type *'
                        value={this.state.type}
                        onChange={(e) => {
                          this.setState({ type: e.target.value });
                        }}
                      />
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Weight '
                        value={this.state.weight}
                        onChange={(e) => {
                          this.setState({ weight: e.target.value });
                        }}
                      />
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Excercise Sets '
                        value={this.state.sets}
                        onChange={(e) => {
                          this.setState({ sets: e.target.value });
                        }}
                      />
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Excercise Reps '
                        value={this.state.reps}
                        onChange={(e) => {
                          this.setState({ reps: e.target.value });
                        }}
                      />
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Excercise Duration *'
                        value={this.state.duration}
                        onChange={(e) => {
                          this.setState({ duration: e.target.value });
                        }}
                      />
                    </div>
                    <div class='form-group m-2 m-2'>
                      <input
                        type='text'
                        class='form-control'
                        placeholder='Excercise Distance '
                        value={this.state.distance}
                        onChange={(e) => {
                          this.setState({ distance: e.target.value });
                        }}
                      />
                    </div>

                    <div className='text-center'>
                      <button
                        type='button'
                        onClick={this.handleExcerciseAdd}
                        disabled={this.state.isDisabled}
                        class='btn btn-primary btn-block'
                      >
                        {this.state.isLoading ? "Wait..." : "Add New Excercise"}
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
