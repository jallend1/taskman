import { useState, useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import { v4 as uuidv4 } from 'uuid';
import {
  makeStyles,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField
} from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';

const Task = ({ projectID, task, index }) => {
  const { completeTask, deleteTask, editTask } = useContext(ProjectContext);
  const [editAction, setEditAction] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [updatedAction, setUpdatedAction] = useState(task.action);
  const useStyles = makeStyles({
    completed: {
      textDecoration: 'line-through',
      opacity: 0.4
    }
  });
  const classes = useStyles();
  return (
    <div
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <ListItem key={uuidv4()}>
        {!editAction ? (
          <>
            <ListItemIcon>
              <Checkbox
                checked={task.isComplete}
                onClick={() => completeTask(projectID, index)}
              />
            </ListItemIcon>
            <ListItemText
              primary={task.action}
              className={task.isComplete ? classes.completed : null}
            />
            {/* If hovering over task, show additional task actions */}
            {hoverState ? (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(projectID, index)}
                >
                  <DeleteOutlined />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => setEditAction(!editAction)}
                >
                  <EditOutlined />
                </IconButton>
              </ListItemSecondaryAction>
            ) : null}
          </>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                editTask(e, projectID, index, updatedAction);
              }}
            >
              <TextField
                label="Add next action"
                onChange={(e) => setUpdatedAction(e.target.value)}
                fullWidth
                autoFocus
                variant="outlined"
                color="primary"
                value={updatedAction}
              />
            </form>
          </>
        )}
      </ListItem>
    </div>
  );
};

export default Task;
