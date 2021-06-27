import { useParams, Link as RRDLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import {
  Button,
  ButtonGroup,
  CardActionArea,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import {
  DeleteOutlined,
  MoreVert,
  ArchiveOutlined,
  UnarchiveOutlined
} from '@material-ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { ProjectContext } from '../Contexts/ProjectContext';
import Footer from './Footer';

const Project = ({ projectID }) => {
  const {
    addTag,
    addTask,
    completeTask,
    deleteTask,
    archiveProject,
    deleteProject,
    projects
  } = useContext(ProjectContext);
  const { id } = useParams();
  const targetProjectID = projectID || id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [newAction, setNewAction] = useState('');
  const [tagsOpen, setTagsOpen] = useState(false);
  // If there are URL parameters passed down, display individual project page components
  const onProjectPage = id ? true : false;
  const project = projects.find((project) => project.id === targetProjectID);
  const [tags, setTags] = useState(project.tags);

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
    },
    tags: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  });

  const classes = useStyles();

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeDialog = (projectID, e = null) => {
    console.log(tags, project.tags);
    if (e.target.textContent === 'Submit') {
      addTag(projectID, tags);
    } else {
      setTags(project.tags);
    }
    setTagsOpen(false);
  };

  const editTags = (e) => {
    setTags(e.target.value);
  };

  const renderProject = () => {
    // const project = projects.find((project) => project.id === targetProjectID);
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
              subheader={
                <>
                  <div>
                    {formatDistanceToNow(new Date(project.createdAt))} ago
                  </div>
                  <div className={classes.tags}>
                    <div>
                      <ButtonGroup>
                        {project.tags.map((tag) => (
                          <Button key={tag} variant="outlined">
                            {tag}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setTagsOpen(!tagsOpen)}
                      >
                        Add Tags
                      </Button>
                      <Dialog
                        open={tagsOpen}
                        onClose={(e) => closeDialog(project.id, e)}
                      >
                        <DialogTitle>Add Tags</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please separate tags with a comma
                          </DialogContentText>
                          <TextField
                            autoFocus
                            fullWidth
                            id="tags"
                            label="Tags"
                            onChange={editTags}
                            value={tags}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={(e) => closeDialog(project.id, e)}>
                            Submit
                          </Button>
                          <Button onClick={(e) => closeDialog(project.id, e)}>
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </>
              }
              action={
                <>
                  <IconButton aria-label="More" onClick={handleOpen}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        archiveProject(project.id);
                      }}
                    >
                      {project.isArchived ? (
                        <>
                          <ListItemIcon>
                            <UnarchiveOutlined color="secondary" />
                          </ListItemIcon>
                          <ListItemText>Unarchive Project</ListItemText>
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <ArchiveOutlined color="primary" />
                          </ListItemIcon>
                          <ListItemText>Archive Project</ListItemText>
                        </>
                      )}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        deleteProject(project.id);
                      }}
                    >
                      <ListItemIcon>
                        <DeleteOutlined color="secondary" />
                      </ListItemIcon>
                      <ListItemText>Delete Project</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
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
