import React from "react";
import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <nav>
      <span className="text-3xl font-bold">Comfy Sloth </span>
      <Outlet />
    </nav>
  );
}
