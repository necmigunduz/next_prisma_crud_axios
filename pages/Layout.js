"use client";
import React from "react";
import Navbar from "./navbar";
import TaskForm from "@/components/task-form";
import { useParams } from "next/navigation";

const Layout = () => {
  const params = useParams();
  console.log("PARAMS", params)
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl mt-6">
        Welcome to Task List Application
      </h1>
      <TaskForm />
    </div>
  );
};

export default Layout;
