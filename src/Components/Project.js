import {
  CardActionArea,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  TextField,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';

const Project = ({ project, addTask, completeTask, deleteTask, deleteProject }) => {
  const [newAction, setNewAction] = useState('');
  
  //   When Project is updated, resets the action state to empty string
  useEffect(() => setNewAction(''), [project]);

  const useStyles = makeStyles({
    root: {
      width: 400,
      margin: '2em auto'
    },
    completed: {
      textDecoration: 'line-through',
      opacity: 0.4
    }
  });

  const classes = useStyles();

  const renderTasks = () => {
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
      <Card className={classes.root}>
        <CardHeader
          title={project.title}
          subheader={project.createdAt.toString()}
          action={
            <IconButton aria-label="delete project" onClick={deleteProject}>
              <DeleteOutlined color="secondary" />
            </IconButton>
          }
        />
        <CardContent>
          <List>{project ? renderTasks() : 'Add a project'}</List>
        </CardContent>
        <CardActionArea>
          <form onSubmit={(e) => addTask(e, project.id, newAction)}>
            <TextField
              label="Add next action"
              variant="outlined"
              color="secondary"
              onChange={(e) => setNewAction(e.target.value)}
              fullWidth
            />
          </form>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Project;
