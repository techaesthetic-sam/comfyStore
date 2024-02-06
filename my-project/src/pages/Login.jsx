import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";

export function action(store) {
  return async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    try {
      const response = await customFetch.post("/auth/local", data);
      // console.log(response.data.user.username);
      store.dispatch(loginUser(response.data));
      toast.success("loggedIn successfully");
      return redirect("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "please check the values entered";
      toast.error(errorMessage);
      return null;
    }
  };
}
export default function Login() {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}
