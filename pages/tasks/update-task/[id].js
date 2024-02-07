"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";

const UpdateTask = () => {
  const params = useParams();
  const id = params?.id;
  const [uniqueTask, setUniqueTask] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  
  const getTask = async (id) => {
    console.log("ID", id)
    try {
      const response = await fetch(`/api/get-task?taskId=${Number(id)}`, {
        method: "GET"
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

  const router = useRouter();

  const handleClick = async (data) => {
    console.log("DATA", data);
    const response = await axios.post("/api/new-task", {
      data: {
        title: data.title,
        description: data.description,
        username: data.username,
      },
    });
    router.push("/tasks");
    return;
  };
  return (
    <>
      <Navbar />
      <div className={`flex flex-col items-center justify-between mt-4`}>
        <h2 className="underline">
          You can update your task by changing the fields below!
        </h2>
        <form
          onSubmit={handleSubmit(handleClick)}
          className="flex flex-col space-y-2 pt-4"
        >
          <label className="text-xl">Task Title</label>
          <input
            {...register("title", { required: true, min: 5, max: 255 })}
            placeholder="Enter task title here..."
            className="border"
            defaultValue={uniqueTask?.task?.title}
          />
          {errors.title && <p>Title is {errors.title.type}!</p>}
          <label className="text-xl">Task Description</label>
          {typeof document !== "undefined" && (
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE
                  // placeholder="Enter your description here..."
                  name="description"
                  {...field}
                  value={uniqueTask?.task?.description}
                />
              )}
              rules={{ required: "Description is required." }}
            />
          )}
          {errors.description && (
            <p>Description is {errors.description.type}!</p>
          )}
          <label className="text-xl">Username</label>
          <input
            {...register("username", { required: true, min: 5 })}
            placeholder="Enter username here..."
            className="mb-3 border h-12"
            defaultValue={uniqueTask?.task?.username}
          />
          {errors.username && <p>Username is {errors.username.type}!</p>}
          <input
            type="submit"
            className="bg-slate-900 rounded p-4 text-white active:bg-slate-600 active:p-5"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateTask;
