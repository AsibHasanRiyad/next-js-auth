"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
    const toastId = toast.loading("Logging In....");
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
      if (response.data.success === true) {
        toast.success("Logged In...", { id: toastId });
      }
      router.push("/login");
    } catch (error: any) {
      console.log("Sign up failed", error.message);
      // toast.error(error.message);
      console.log(error);
      toast.error("User already Exist", { id: toastId });
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
    <section className="">
      {/* <Toaster /> */}
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
