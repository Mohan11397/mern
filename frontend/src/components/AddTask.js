import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addTaskToServer } from "../slices/tasksSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLoggedout } from "../slices/authSlice.js";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    console.log({ title, description });
    // dispatch(addTaskToList({ title, description }))
    dispatch(addTaskToServer({ title, description }));
    setTitle("");
    setDescription("");
  };
  const logOut = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is important to include cookies in the request
      });

      if (response.ok) {
        console.log("Logout successful");
        await dispatch(authLoggedout());
      } else {
        console.error("Logout failed:", response.statusText);
      }

      clearCookie("cache-x");
      clearCookie("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const clearCookie = function (name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return (
    <section className="my-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit" onClick={addTask}>
            Add Task
          </Button>
        </div>
        <div className="text-end">
          <Button variant="primary" type="submit" onClick={logOut}>
            logout
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default AddTask;
