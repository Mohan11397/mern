import React, { useEffect, useState } from "react";
import { addTaskToServer, updateTaskInServer } from "../../slices/tasksSlice";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const CreateTaskModal = ({ isOpen, toggleModal, task }) => {
  // const { selectedTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  // const navigate = useNavigate();


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [id, setId] = useState();
  console.log("params task: ", id);

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setStatus(selectedValue === "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      dispatch(
        updateTaskInServer({
          id: task._id,
          title,
          description,
          status: true,
        })
      );
      setTitle("");
      setDescription("");
      toggleModal();
    } else {
      dispatch(addTaskToServer({ title, description, status }));
      setTitle("");
      setDescription("");
      toggleModal();
      // navigate("/dashboard"); // Adjust based on where you want to navigate after task creation
    }
  };

  // const addTask = (e) => {
  //   e.preventDefault();
  //   console.log({ title, description, status });
  //   dispatch(addTaskToServer({ title, description, status }));
  //   setTitle("");
  //   setDescription("");
  //   toggleModal();
  //   // navigate("/dashboard"); // Adjust based on where you want to navigate after task creation
  // };

  // const updateTask = () => {
  //   // props.onHide();

  //   // dispatch(updateTaskInList({id, title, description}))
  //   dispatch(
  //     updateTaskInServer({
  //       id: task._id,
  //       title,
  //       description,
  //       status: true,
  //     })
  //   );
  // };
  useEffect(() => {
    if (Object.keys(task).length !== 0) {
      setTitle(task.title);
      setDescription(task.description);
      setId(task.id);
    }
  }, [task, task.description, task.id, task.title]);
  return (
    <>
      {isOpen && (
        <div className="absolute bg-gray-400/50 w-[100vw] min-h-screen z-10 top-0">
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden md:inset-0"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {task ? "Update Task" : "Create New Task"}
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="task title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        name="taskTitle"
                        id="task-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-1 outline-indigo-600 px-2 "
                        placeholder="Enter Task Title"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-1 outline-indigo-600 px-2"
                        placeholder="$2999"
                        //   required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        onChange={handleStatusChange} // Corrected attribute name
                        value={status ? "true" : "false"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-1 outline-indigo-600 px-2"
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-1 outline-indigo-600 px-2"
                        placeholder="Write product description here"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {task ? "Update Task" : "Add New Task"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
