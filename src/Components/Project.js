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
  IconButton,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import { ProjectContext } from '../Contexts/ProjectContext';

const Project = ({ project, completeTask, deleteTask, deleteProject, projectInURL = false }) => {
  // TODO: If projectInURL === true then pull the project ID from the URL
  const [newAction, setNewAction] = useState('');
  const { addTask } = useContext(ProjectContext);
  
  //   When Project is updated, resets the action state to empty string
  useEffect(() => setNewAction(''), [project]);

  const useStyles = makeStyles({
    root: {
      width: 400,
      margin: "auto",
      padding: "1em 0.5em"
    },
    completed: {
      textDecoration: "line-through",
      opacity: 0.4,
    },
  });

  const classes = useStyles();

  const renderProject = () => {
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
        <List>{project ? renderTasks() : "Add a project"}</List>
      </CardContent>
      <CardActionArea>
        <form onSubmit={(e) => addTask(e, project.id, newAction)}>
          {/* TODO: Not liking the textfieldwhen in focus -- Weird color change? */}
          <TextField
            label="Add next action"
            onChange={(e) => setNewAction(e.target.value)}
            fullWidth
            autoFocus
            variant="outlined"
            color="primary"
          />
        </form>
      </CardActionArea>
    </Card>
    </>
    )
  }
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
      {renderProject()}
    </>
  );
};

export default Project;
