import React from "react";

const TaskBox = ({ tasks }) => {
  return (
    <div>
      {tasks?.length === 0 ? (
        <p className="text-center my-auto">No task found!</p>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {tasks?.data?.list.map((task, index) => {
            return (
              <li
                key={index}
                className="flex flex-col border py-6 px-2 bg-slate-900 text-slate-300 rounded-lg mx-2 text-center"
              >
                <div className="px-4">
                  <h1 className="font-bold">{task?.title}</h1>
                  <p>{task?.description}</p>
                  <p>
                    <span className="font-bold">by </span>
                    {task?.username}
                  </p>
                </div>
                <div className="flex space-x-2 rounded-md mb-2 mt-4 justify-center">
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
  );
};

export default TaskBox;
