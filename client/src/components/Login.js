import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios"

//Utils
import { axiosWithAuth } from "../utils/AxiosWithAuth";


const initialCred = {
  username: "",
  password: ""
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState(initialCred);
  const history = useHistory();

  const handleLogin = (e) => {
      e.preventDefault();
      axiosWithAuth().post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.payload)
        props.history.push("/colors")
      })
      .catch((err) => {
        console.log("Errored out with", err)
      })
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="user">
          Username:
          <input type="text" name="username" onChange={handleChange} value={credentials.username} ></input>
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" name="password" onChange={handleChange} value={credentials.password} ></input>
        </label>
        <button>Log-in</button>
      </form>
    </>
  );
};

export default Login;
