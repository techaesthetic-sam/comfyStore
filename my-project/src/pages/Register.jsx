import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  //console.log(data);     //directly values are getting retrieved here and stored

  try {
    const response = await customFetch.post("/auth/local/register", data);
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "please check the values entered";
    toast.error(errorMessage);
    return null;
  }

  return null;
}
export default function Register() {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="username"
          name="username"
          defaultValue="sam"
        />
        <FormInput
          type="email"
          label="email"
          name="email"
          defaultValue="sam.us@gmail.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="123456"
        />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
}
