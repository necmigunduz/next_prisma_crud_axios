import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";

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
        setLoading(true);
        setTasks(response);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = async (id) => {
    const res = await fetch("/api/delete-task", {
      method: "DELETE",
      body: JSON.stringify({ taskId: id }),
    });
    await res.json();
  };

  useEffect(() => {
    getTask(user);
    getAllUsers();
  }, [user]);

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
        {loading ? (
          <p className="text-center my-auto">Loading...</p>
        ) : (
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
                    <button
                      className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(task?.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Tasks;
