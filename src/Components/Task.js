import { useState, useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import { v4 as uuidv4} from 'uuid';
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
    <div onMouseEnter={() => setHoverState(true)} onMouseLeave={() => setHoverState(false)}>
    <ListItem key={uuidv4()}>
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
      {hoverState ? (
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteTask(projectID, index)}
        >
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>

      ) : null}
    </ListItem>
    </div>
  );
};

export default Task;
