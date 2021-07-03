import { useState, useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import {
  makeStyles,
  ListItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';

const Task = ({projectID, task, index}) => {
  console.log()
  const { completeTask, deleteTask } = useContext(ProjectContext);
  const [hoverState, setHoverState] = useState(false);
  const useStyles = makeStyles({
    completed: {
      textDecoration: 'line-through',
      opacity: 0.4
    }
  });
  const classes = useStyles();
  return (
    <ListItem key={task.action}>
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
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteTask(projectID, index)}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
