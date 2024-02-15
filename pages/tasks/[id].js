"use client";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UniqueTask = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id)

  const [uniqueTask, setUniqueTask] = useState();
  const getTask = async (id) => {
    try {
      const response = await fetch(`/api/get-task?taskId=${Number(id)}`, {
        method: "GET",
      });
      const data = await response.json();
      setUniqueTask(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getTask(id);
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await fetch("/api/delete-task", {
        method:"DELETE",
        body: { taskId: id },
      });
      router.push("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-center border p-2 mx-6 mt-14 bg-slate-500 text-white">
        <header className="font-extrabold">TASK {id}</header>
        <h1 className="font-bold">{uniqueTask?.task?.title}</h1>
        <p>{uniqueTask?.task?.description}</p>
        <p>By {uniqueTask?.task?.username}</p>
        <div className="flex space-x-2 rounded-md mb-2 mt-4 justify-center">
          <button
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded active:bg-blue-900"
            onClick={() => router.push(`/tasks/update-task/${id}`)}
          >
            Update
          </button>
          <button
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded active:bg-red-900"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default UniqueTask;
