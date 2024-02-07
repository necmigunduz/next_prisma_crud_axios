import React from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from 'axios';
import { Inter } from "next/font/google";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/router";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  
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
    router.push("/tasks")
    return;
  };
  return (
    <div
      className={`flex flex-col items-center justify-between mt-4`}
    >
      <h2 className="underline">Please fill the form to enter a new task!</h2>
      <form
        onSubmit={handleSubmit(handleClick)}
        className="flex flex-col space-y-2 pt-4"
      >
        <label className="text-xl">Task Title</label>
        <input
          {...register("title", { required: true, min: 5, max: 255 })}
          placeholder="Enter task title here..."
          className="border"
        />
        {errors.title && <p>Title is {errors.title.type}!</p>}
        <label className="text-xl">Task Description</label>
        {typeof document !== "undefined" && (
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
            rules={{ required: "Description is required." }}
          />
        )}
        {errors.description && <p>Description is {errors.description.type}!</p>}
        <label className="text-xl">Username</label>
        <input
          {...register("username", { required: true, min: 5 })}
          placeholder="Enter username here..."
          className="mb-3 border h-12"
        />
        {errors.username && <p>Username is {errors.username.type}!</p>}
        <input type="submit" className="bg-slate-900 rounded p-4 text-white active:bg-slate-600 active:p-5" />
      </form>
    </div>
  );
};

export default TaskForm;
