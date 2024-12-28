import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useTaskStore from "../store/taskStore";

interface TaskProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskProps> = ({ task, index }) => {
  const { deleteTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const canDeleteTask = task.status === "To-Do";

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          sx={{
            marginBottom: "8px",
            borderRadius: "8px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "grab",
            transition: "transform 0.2s ease",
            ...provided.draggableProps.style,
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            sx={{ background: (theme) => theme.palette.info.main }}
          >
            <CardContent style={{ flex: 1 }}>
              <Typography sx={{ color: (theme) => theme.palette.common.white }}>
                {task.title}
              </Typography>
            </CardContent>
            {canDeleteTask ? (
              <IconButton onClick={handleDelete} aria-label="delete">
                <DeleteIcon
                  sx={{ color: (theme) => theme.palette.common.white }}
                />
              </IconButton>
            ) : null}
          </Stack>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
