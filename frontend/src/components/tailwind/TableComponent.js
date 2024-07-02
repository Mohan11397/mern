// src/components/TableComponent.js
import React, { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskFromServer,
  getTasksFromServer,
  // setSelectedTask,
} from "../../slices/tasksSlice";
import CreateTaskModal from "./createTaskModal";
import generatePDF from "../generatepdf/generatePDF";

const TableComponent = () => {
  const dispatch = useDispatch();
  const { tasksList } = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "hashedPassword", // usually, you wouldn't include the password in the report
    role: "user",
    profileImage: "",
    bio: "",
    address: {},
    phoneNumber: "",
    socialLinks: {},
    isActive: true,
    lastLogin: new Date(),
  };

  const handleDownloadReport = () => {
    generatePDF(userData);
  };

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask("");
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const updateTask = (task) => {
    console.log("updateTask new modal", task);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = (taskId) => {
    dispatch(deleteTaskFromServer(taskId))
      .then(() => {
        dispatch(getTasksFromServer());
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // const downloadImage = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/download-image", {
  //       method: 'GET',
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.style.display = "none";
  //     a.href = url;
  //     a.download = "lok_sabha.jpg";
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading the image", error);
  //   }
  // };
  

  return (
    <>
      <div className="bg-white py-2 px-4 sm:px-0 rounded-md md:container mx-auto">
        <div className="flex items-center justify-between pb-0">
          <div>
            <h2 className="text-gray-600 font-semibold">Tasks Order</h2>
            <span className="text-xs">All Task item</span>
          </div>
          <div className="flex items-baseline justify-between flex-wrap flex-col md:flex-row space-y-4">
            <div className="flex bg-gray-50 items-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="bg-gray-50 outline-none ml-1 block"
                type="text"
                name=""
                id=""
                placeholder="search..."
              />
            </div>
            <div className="space-x-6 flex flex-col flex-wrap md:flex-row space-y-4 justify-center items-end md:items-baseline w-full md:w-auto">
              <div>
                <button
                  onClick={handleDownloadReport}
                  className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                >
                  New Report
                </button>
              </div>
              <div>
                <button
                  onClick={handleCreateTask}
                  className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                >
                  Create Task
                </button>
              </div>
              {/* <div>
                <button
                  onClick={downloadImage}
                  className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                >
                  Download Image
                </button>
              </div> */}
              {/* <CreateTaskModal
                isOpen={isModalOpen}
                toggleModal={handleCloseModal}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md mt-2 md:container mx-auto">
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                State
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Description
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {tasksList.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  There are no tasks.
                </td>
              </tr>
            ) : (
              tasksList.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700">
                        {task.userId?.name || "No Name"}
                      </div>
                      <div className="text-gray-400">
                        {task.userId?.name || "No Name"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                      {task.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start gap-4">
                      <a href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          onClick={() => deleteTask(task._id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                      <a href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          onClick={() => updateTask(task)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          toggleModal={handleCloseModal}
          task={selectedTask} // Pass selected task to modal for update
        />
      )}
    </>
  );
};

export default TableComponent;
