import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <nav class='navbar navbar-expand-lg navbar-light bg-light ml-5 mr-5'>
        <Link class='navbar-brand' to='/'>
          Excercise Tool
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div class='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item'>
              <Link class='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/addWorkout'>
                Add Wokrout Plan
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/addexcercise'>
                Add Excercise
              </Link>
            </li>
          </ul>
          <form class='form-inline my-2 my-lg-0'>
            <ul class='navbar-nav'>
              <li class='nav-item'>
                <button class='btn btn-secondry' onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    </>
  );
}
