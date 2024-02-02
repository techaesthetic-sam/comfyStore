import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
export default function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <nav>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-8">
          <Outlet />
        </section>
      )}
    </nav>
  );
}
