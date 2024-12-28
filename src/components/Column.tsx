import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Paper, Typography, useTheme } from "@mui/material";
import TaskCard from "./TaskCard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  columnId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, columnId }) => {
  const theme = useTheme();

  // Customize the column background according to the Status
  const columnStyle = {
    "To-Do": {
      backgroundColor: theme.palette.primary.light,
    },
    "In Progress": {
      backgroundColor: theme.palette.secondary.light,
    },
    Done: {
      backgroundColor: theme.palette.success.light,
    },
  };

  return (
    <Paper
      sx={{
        padding: "16px",
        margin: "8px",
        backgroundColor: columnStyle[columnId as TaskStatus],
        borderRadius: "8px",
        boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1)",
        minHeight: "300px",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            style={{ minHeight: "100px" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
