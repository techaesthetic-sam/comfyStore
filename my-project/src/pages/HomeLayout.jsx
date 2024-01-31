import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";
export default function HomeLayout() {
  return (
    <nav>
      <Header />
      <Navbar />
      <section className="align-element py-8">
        <Outlet />
      </section>
    </nav>
  );
}
