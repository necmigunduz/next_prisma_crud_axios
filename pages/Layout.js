"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import Navbar from "./navbar";
const inter = Inter({ subsets: ["latin"] });

const Layout = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <Navbar />
      <div className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
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
      </div>
    </>
  );
};

export default Layout;