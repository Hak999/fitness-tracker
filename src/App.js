import React from "react";
import Axios from "axios";
import Moment from "react-moment";
import Navbar from "./components/pages/Navbar";
import { baseUrl } from "./baseUrl";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      workouts: [],
    };
  }

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
        console.log(response);
        this.setState(
          {
            workouts: response.data.data,
          },
          () => {
            console.log(this.state.workouts);
          }
        );
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
        <div className='container'>
          <div className='col-md-12  mt-5'>
            <h4>Stats</h4>
            <table class='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>Workout Name</th>
                  <th scope='col'>Workout Date</th>
                  <th scope='col'>Excercise Date</th>
                  <th scope='col'>Excercise Name</th>
                  <th scope='col'>Excercise Type</th>
                  <th scope='col'>Weight</th>
                  <th scope='col'>Sets</th>

                  <th scope='col'>Reps</th>
                  <th scope='col'>Duration</th>
                  <th scope='col'>Distance</th>
                </tr>
              </thead>
              <tbody>
                {this.state.workouts.map((workout) => {
                  return workout.excercises.map((excercise) => {
                    return (
                      <tr key={excercise._id}>
                        <td>{workout.name}</td>
                        <td>
                          <Moment format='YYYY/MM/DD'>
                            {workout.createdAt}
                          </Moment>{" "}
                        </td>
                        <td>
                          <Moment format='YYYY/MM/DD'>
                            {excercise.createdAt}
                          </Moment>{" "}
                        </td>
                        <td>{excercise.name}</td>
                        <td>{excercise.type}</td>
                        <td>{excercise.weight}</td>
                        <td>{excercise.sets}</td>
                        <td>{excercise.reps}</td>
                        <td>{excercise.duration}</td>
                        <td>{excercise.distance}</td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default App;
