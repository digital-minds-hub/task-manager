import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Grid2, Stack, Typography } from "@mui/material";
import useTaskStore from "../store/taskStore";
import Column from "./Column";
import AddTask from "./AddTask";

const Board: React.FC = () => {
  const { tasks, updateTask } = useTaskStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    updateTask(result.draggableId, {
      status: result.destination.droppableId as TaskStatus,
    });
  };

  const columns = {
    "To-Do": tasks.filter((task) => task.status === "To-Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  const columnKeys = Object.keys(columns) as (keyof Record<
    TaskStatus,
    Task[]
  >)[];

  return (
    <Stack sx={{ padding: "16px", backgroundColor: "#f0f0f0" }}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}
      >
        Task Manager
      </Typography>
      <Stack width="100%" alignItems="end">
        <AddTask />
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid2 container>
          {columnKeys.map((columnId) => (
            <Grid2 key={columnId} size={{ xs: 12, sm: 4 }}>
              <Column
                title={columnId}
                tasks={columns[columnId]}
                columnId={columnId}
              />
            </Grid2>
          ))}
        </Grid2>
      </DragDropContext>
    </Stack>
  );
};

export default Board;
