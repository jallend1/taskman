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
import { useParams } from 'react-router-dom';
import { DeleteOutlined } from "@material-ui/icons";
import { useState, useContext } from "react";
import { ProjectContext } from '../Contexts/ProjectContext';

const Project = ({ projectID }) => {
  const { addTask, completeTask, deleteTask, deleteProject, projects } = useContext(ProjectContext);
  const {id} = useParams()
  const targetProjectID = projectID || id;
  const [newAction, setNewAction] = useState('');
  
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
    const project = projects.find(project => project.id === targetProjectID)
    if(!project){
      return 'Fetching project...'
    }
    else{
    return (
      <>
      <Card className={classes.root}>
      <CardHeader
        title={project.title}
        subheader={project.createdAt.toString()}
        action={
          <IconButton aria-label="delete project" onClick={() => deleteProject(project.id)}>
            <DeleteOutlined color="secondary" />
          </IconButton>
        }
      />
      <CardContent>
        <List>{project ? renderTasks(project) : "Add a project"}</List>
      </CardContent>
      <CardActionArea>
        <form onSubmit={(e) => {
          addTask(e, project.id, newAction);
          setNewAction('');
          }}>
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
    )}
  }
  const renderTasks = (project) => {
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
      {projects.length > 0 ? renderProject() : 'Loading...'}
    </>
  );
};

export default Project;