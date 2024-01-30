import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components";
export default function HomeLayout() {
  return (
    <nav>
      <Header />
      <section className="align-element py-8">
        <Outlet />
      </section>
    </nav>
  );
}
