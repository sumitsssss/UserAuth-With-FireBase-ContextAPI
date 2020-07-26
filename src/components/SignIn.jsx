import React, { useState } from "react";
import { Link } from "@reach/router";
import {
  auth,
  signInWithGoogle,
} from "../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
    setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };
  

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            placeholder="For ex. johndoe@gmail.com"
            value={email}
            onChange={(event) => onChangeHandler(event)}
            id="userEmail"
            className="my-1 p-1 w-full"
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="Your Password"
            value={password}
            onChange={(event) => onChangeHandler(event)}
            className="mt-1 mb-3 p-1 w-full"
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign In{" "}
          </button>
        </form>
        <p className="text-center my-3">or</p>
        <button
          onClick={() => signInWithGoogle()}
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
        >
          Sign with Google
        </button>
        <p className="text-center my-3">
          Don't have an account?
          <Link to="signUp" className="text-blue-500 hover:text-blue-600 mx-1 ">
            Sign up here
          </Link>
          <br />
          <Link
            className="text-blue-500 hover:text-blue-500"
            to="passwordReset"
          >
            Forget Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
