import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';

const Project = ({ project, addTask, completeTask, deleteTask }) => {
  const [newAction, setNewAction] = useState('');
  const useStyles = makeStyles({
    completed: {
      textDecoration: 'line-through',
      opacity: 0.4
    }
  });

  const classes = useStyles();
  //   When Project is updated, resets the action state to empty string
  useEffect(() => setNewAction(''), [project]);

  const renderProjects = () => {
    return project.taskList.map((task, index) => {
      return (
        <ListItem key={task.action}>
          <ListItemIcon>
            <Checkbox
              checked={task.isComplete}
              onClick={() => completeTask(project.id, index)}
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
              onClick={() => deleteTask(project.id, index)}
            >
              <DeleteOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };
  return (
    <>
      <Card>
        <CardHeader
          title={project.title}
          subheader={project.createdAt.toString()}
        />
        <CardContent>
          <List>{project ? renderProjects() : 'Add a project'}</List>
        </CardContent>
        <CardActions>
          <form onSubmit={(e) => addTask(e, project.id, newAction)}>
            <TextField
              label="Add next action"
              variant="outlined"
              color="secondary"
              onChange={(e) => setNewAction(e.target.value)}
            />
          </form>
        </CardActions>
      </Card>
    </>
  );
};

export default Project;
