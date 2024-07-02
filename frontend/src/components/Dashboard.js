import React from "react";
import { Container, Row } from "react-bootstrap";
import AddTask from "./AddTask";
import Navbar from "./Navbar";
import Col from "react-bootstrap/Col";
import TasksList from "./TasksList";
import { useAppContext } from "./context/AppContext";
const Dashboard = () => {
  const { tasks } = useAppContext();
  console.log("tasks", tasks);

  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TasksList />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
