import { useParams, Link as RRDLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import {
  Button,
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
  Typography,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { ProjectContext } from '../Contexts/ProjectContext';
import Footer from './Footer';

const Project = ({ projectID }) => {
  const { addTask, completeTask, deleteTask, deleteProject, projects } =
    useContext(ProjectContext);
  const { id } = useParams();
  const targetProjectID = projectID || id;
  const [newAction, setNewAction] = useState('');
  // If there are URL parameters passed down, display individual project page components
  const onProjectPage = id ? true : false;

  const useStyles = makeStyles({
    root: {
      width: 400,
      margin: 'auto',
      padding: '1em 0.5em'
    },
    completed: {
      textDecoration: 'line-through',
      opacity: 0.4
    },
    homeButton: {
      margin: '1.25em 0'
    }
  });

  const classes = useStyles();

  const renderProject = () => {
    const project = projects.find((project) => project.id === targetProjectID);
    // TODO: Meant to display only when fetching; Add project not found message
    if (!project) {
      return 'Fetching project...';
    } else {
      return (
        <>
          <Card>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  component={RRDLink}
                  to={`/project/${project.id}`}
                >
                  {project.title}
                </Typography>
              }
              subheader={`${formatDistanceToNow(
                new Date(project.createdAt)
              )} ago`}
              action={
                <IconButton
                  aria-label="delete project"
                  onClick={() => deleteProject(project.id)}
                >
                  <DeleteOutlined color="secondary" />
                </IconButton>
              }
            />
            <CardContent>
              <List>{project ? renderTasks(project) : 'Add a project'}</List>
            </CardContent>
            <CardActionArea>
              <form
                onSubmit={(e) => {
                  addTask(e, project.id, newAction);
                  setNewAction('');
                }}
              >
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
      );
    }
  };
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
      <div className={classes.root}>
        {projects.length > 0 ? renderProject() : 'Loading...'}
        {onProjectPage ? (
          <Button
            variant="contained"
            color="secondary"
            component={RRDLink}
            to="/"
            className={classes.homeButton}
            fullWidth
          >
            Return Home
          </Button>
        ) : null}
      </div>
      {onProjectPage ? <Footer /> : null}
    </>
  );
};

export default Project;
