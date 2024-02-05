"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

const Layout = () => {
  const [tasks, setTasks] = useState();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  console.log(errors);
  console.log(tasks);
  const handleClick = async (data) => {
    console.log("DATA", data);
    const response = await axios.post("/api/new-task", {
      data: {
        title: data.title,
        description: data.description,
        username: data.username,
      },
    });
    console.log("RESPONSE", response);
    return;
  };
  const getTask = async (username = "necmi") => {
    try {
      const response = await axios.get(`/api/get-task?username=${username}`);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getTask();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex flex-col space-y-2"
      >
        <label>Title</label>
        <input
          {...register("title", { required: true, min: 5, max: 255 })}
          placeholder="Enter task title here..."
        />
        {errors.title && <p>Title is {errors.title.type}!</p>}
        <label>Description</label>
        {typeof document !== 'undefined' && (
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Enter your description here..."
                name="description"
                {...field}
              />
            )}
            rules={{ required: 'Description is required.' }}
          />
        )}
        {errors.description && <p>Description is {errors.description.type}!</p>}
        <label>Username</label>
        <input
          {...register("username", { required: true, min: 5 })}
          placeholder="Enter username here..."
        />
        {errors.username && <p>Username is {errors.username.type}!</p>}
        <input type="submit" className="bg-slate-600 rounded p-5" />
      </form>
      <br />
      <h1 className="font-bold py-6 m-6 bg-slate-900 text-white rounded-full text-center mb-6 w-11/12">
        Task List
      </h1>
      <ul className="flex flex-wrap space-x-6 justify-center">
        {tasks?.data?.list.map((task, index) => {
          return (
            <li
              key={index}
              className="flex flex-col space-y-4 border p-4 bg-slate-200 rounded-lg"
            >
              <p>
                <span className="font-bold">Title: </span>
                {task?.title}
              </p>
              <p>Description: {task?.description}</p>
              <p>Username: {task?.username}</p>
              <div className="flex space-x-2 border bg-slate-400 p-1 rounded-md">
                <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
                <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Layout;
