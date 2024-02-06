import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import TaskBox from "@/components/taskBox";

const Tasks = () => {
  const [tasks, setTasks] = useState();
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    const users = await axios.get("/api/get-all-username");
    setAllUsers(users?.data?.usernames);
  };
  const getTask = async (username) => {
    await axios
      .get(`/api/get-task?username=${username}`)
      .then((response) => {
        setTasks(response);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getTask(user);
    getAllUsers();
  }, [user, tasks]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center content-center">
        <h1 className="font-extrabold w-128 p-6 mx-12 my-6 bg-slate-900 text-white rounded-full text-center mb-6 text-6xl">
          Tasks
        </h1>
        <div className="flex flex-col text-center">
          <h4 className="text-xl font-bold">All Users</h4>
          {allUsers.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
        <span className="border w-128 text-center space-x-6 bg-slate-200 py-4 mx-6 my-6">
          <label>
            Enter a username from the user list above to see his/her tasks.
          </label>
          <input
            className="border w-24"
            placeholder="Username..."
            onChange={(data) => setUser(data.target.value)}
          />
        </span>
        <TaskBox tasks={tasks} />
      </div>
    </>
  );
};

export default Tasks;
