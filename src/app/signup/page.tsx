"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DNA } from "react-loader-spinner";

const SignUpPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  // const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const handelSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      setErrorMessage("");
      if (password.length < 6) {
        setErrorMessage("Password should be more than 6 characters");
        return;
      } else if (!/[A-Z]/.test(password)) {
        setErrorMessage("Your Password should have at least one Uppercase");
        return;
      } else if (!/[!@#$%^&*]/.test(password)) {
        setErrorMessage(
          "Your Password should have at least one special character - !@#$%^&*"
        );
        return;
      } else if (!/[1-9]/.test(password)) {
        setErrorMessage("Your Password should have at least one number");
        return;
      }
      console.log(name, email, password);
      const user = { name, email, password };
      console.log(user);
      const response = await axios.post("/api/users/signup", user);
      console.log("signUp Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (
  //     user.email.length > 0 &&
  //     user.name.length > 0 &&
  //     user.password.length > 0
  //   ) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // }, [user]);
  console.log(user);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handelSubmit} className="w-full max-w-md">
          <h1 className="mt-3 text-2xl text-center font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
            Register
          </h1>

          <div className="relative flex items-center mt-8">
            <input
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
              name="name"
              required
            />
          </div>
          <div className="relative flex items-center mt-8">
            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              name="email"
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <input
              type="password"
              className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {loading ? (
                <div className=" flex justify-center items-center">
                  <DNA
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <h1 className=" text-center text-red-500 py-2">{errorMessage}</h1>

            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              or
            </p>

            <button
              // onClick={handelGoogleSignIn}
              className="flex items-center justify-center w-full px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>

              <span className="mx-2">Sign in with Google</span>
            </button>

            <div className="mt-6 text-center ">
              <div className="text-sm mb-4 text-blue-500 hover:underline dark:text-blue-400">
                Already have an account ? <Link href={"/login"}>Sign In</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
