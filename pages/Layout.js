"use client";
import React from "react";
import TaskForm from "@/components/task-form";
import { useParams } from "next/navigation";



const Layout = () => {
  const params = useParams();

  return (
    <div>
      <h1 className="text-center text-3xl mt-6">
      Welcome to Task List Application
      </h1>
      <TaskForm />
    </div>
  );
};

export default Layout;
