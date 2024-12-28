import React, { useState } from "react";
import { TextField, Button, Stack, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import useTaskStore from "../store/taskStore";

const AddTask: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { tasks, setTasks } = useTaskStore();

  const handleAddTask = () => {
    if (taskTitle.trim() === "") return;

    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      status: "To-Do" as TaskStatus,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);

    // Clear the input
    setTaskTitle("");
  };

  return (
    <Box component="form" onSubmit={handleAddTask}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          disabled={!taskTitle.trim()}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTask;
