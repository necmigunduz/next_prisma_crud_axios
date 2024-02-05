import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const getTask = async (username = "necmi") => {
    try {
      const response = await axios.get(`/api/get-task?username=${username}`);
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="font-extrabold w-128 p-6 mx-12 my-6 bg-slate-900 text-white rounded-full text-center mb-6 text-6xl">
        Tasks
      </h1>
      <ul className="flex flex-wrap justify-center">
        {tasks?.data?.list.map((task, index) => {
          return (
            <li
              key={index}
              className="flex flex-col border pt-6 px-2 bg-slate-900 text-slate-300 rounded-lg mx-2 text-center"
            >
              <span className="font-bold">{task?.title}</span>
              <span>{task?.description}</span>
              <p>
                <span className="font-bold">by </span>
                {task?.username}
              </p>
              <div className="flex space-x-2 rounded-md my-3">
                <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
                <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tasks;
