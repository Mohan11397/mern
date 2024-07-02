import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskFromServer,
  getTasksFromServer,
  setSelectedTask,
} from "../slices/tasksSlice";

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasksList } = useSelector((state) => state.tasks);
  const [modalShow, setModalShow] = useState(false);

  console.log("tasksList", tasksList);

  const updateTask = (task) => {
    console.log("-0----------", task);
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);

  const deleteTask = (taskId) => {
    dispatch(deleteTaskFromServer(taskId))
      .then(() => {
        console.log("Task deleted, now fetching updated task list");
        dispatch(getTasksFromServer());
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // useEffect(() => {
  //   const BASE_URL = "http://localhost:8080/api/user/login";

  //   fetch(BASE_URL, {
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: "mohank@gmail.com",
  //       password: "password123",
  //     }),
  //     method: "POST",
  //     credentials: "include",
  //   })
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => (
              <tr className="text-center" key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button variant="primary" className="mx-3">
                    <i
                      className="bi bi-pencil-square"
                      onClick={() => updateTask(task)}
                    ></i>
                  </Button>{" "}
                  <Button variant="danger">
                    <i
                      className="bi bi-trash3"
                      onClick={() => deleteTask(task._id)}
                    ></i>
                  </Button>{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default TasksList;
