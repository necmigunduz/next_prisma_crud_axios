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
  const [uniqueTask, setUniqueTask] = useState();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const getTask = async (id) => {
    try {
      const response = await fetch(`/api/get-task?taskId=${Number(id)}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data)
      setUniqueTask(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getTask(id);
  }, [id]);

  const router = useRouter();

  const handleClick = async (
    data = {
      title: uniqueTask?.task?.title,
      description: uniqueTask?.task?.description,
      username: uniqueTask?.task?.username,
    }
  ) => {
    await fetch(`/api/edit-task?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        username: data.username,
      }),
    })
    .then(() => router.push(`/tasks/${id}`))
    .catch((e) => console.log("PUT ERR", e));
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
            className="border w-96"
            defaultValue={uniqueTask?.task?.title}
          />
          {errors.title && !uniqueTask && <p>Title is {errors.title.type}!</p>}
          <label className="text-xl">Task Description</label>
          <textarea
            {...register("description", { required: true, min: 1, max: 2500 })}
            placeholder="Enter task description here..."
            className="border h-80"
            defaultValue={uniqueTask?.task?.description}
          />

          {/* {typeof document !== "undefined" && (
            <Controller
              name="description"
              control={control}
              render={({ field, ref }) => (
                <SimpleMDE
                  name="description"
                  {...field}
                  ref={ref}
                  value={uniqueTask?.task?.description}
                  onClick={(e) => handleChange(e)}
                />
              )}
              rules={{ required: "Description is required." }}
            />
          )} */}
          {errors.description && !uniqueTask && (
            <p>Description is {errors.description.type}!</p>
          )}
          <label className="text-xl">Username</label>
          <input
            {...register("username", { required: true, min: 5 })}
            placeholder="Enter username here..."
            className="mb-3 border h-12"
            defaultValue={uniqueTask?.task?.username}
          />
          {errors.username && !uniqueTask && (
            <p>Username is {errors.username.type}!</p>
          )}
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
