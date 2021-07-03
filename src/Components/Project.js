// TODO: Revisit Project name updating process because it feels unnecessary clunky

import { useParams, Link as RRDLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import {
  Button,
  ButtonGroup,
  CardActionArea,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography
} from '@material-ui/core';
import {
  ArchiveOutlined,
  DeleteOutlined,
  DoneAll,
  Edit,
  ExpandLess,
  ExpandMore,
  MoreVert,
  Star,
  StarOutline,
  UnarchiveOutlined
} from '@material-ui/icons';
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { ProjectContext } from '../Contexts/ProjectContext';

import Task from './Task';

const Project = ({ projectID }) => {
  const {
    addTag,
    addTask,
    completeProject,
    archiveProject,
    deleteProject,
    toggleFavorite,
    updateProjectName,
    projects
  } = useContext(ProjectContext);
  const { id } = useParams();
  const targetProjectID = projectID || id;
  const [anchorEl, setAnchorEl] = useState(null);
  const [newAction, setNewAction] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  // If there are URL parameters passed down, display individual project page components
  const onProjectPage = id ? true : false;
  // If URL parameters are passed down, show expanded card by default
  const [expanded, setExpanded] = useState(onProjectPage ? true : false);

  const useStyles = makeStyles({
    root: {
      width: 400,
      margin: 'auto',
      padding: '1em 0.5em'
    },
    addAction: {
      marginTop: '1.5em'
    },
    homeButton: {
      margin: '1.25em 0'
    },
    tags: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  });

  const classes = useStyles();

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeDialog = (projectID, e = null) => {
    if (e.target.textContent === 'Submit') {
      addTag(projectID, tags);
    } else {
      const targetProject = projects.find(
        (project) => project.id === projectID
      );
      setTags(targetProject.tags);
    }
    setTagsOpen(false);
  };

  const editTags = (e) => {
    setTags(e.target.value);
  };

  const changeTitle = (projectTitle) => {
    setNewTitle(projectTitle);
    setEditTitle(!editTitle);
  };

  const handleUpdateTitle = (e, projectID) => {
    if (e.key === 'Enter') {
      setEditTitle(false);
      updateProjectName(projectID, newTitle);
    } else {
      setNewTitle(e.target.value);
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

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
                editTitle ? (
                  <TextField
                    label="Edit Project Name"
                    onChange={(e) => handleUpdateTitle(e, project.id)}
                    onKeyPress={(e) => handleUpdateTitle(e, project.id)}
                    value={newTitle}
                    fullWidth
                    autoFocus
                    variant="outlined"
                    color="primary"
                  />
                ) : (
                  <Typography
                    variant="h6"
                    component={RRDLink}
                    to={`/project/${project.id}`}
                  >
                    {project.title}
                  </Typography>
                )
              }
              subheader={`${formatDistanceToNow(
                new Date(project.createdAt)
              )} ago`}
              action={
                <>
                  <IconButton
                    aria-label="Favorite"
                    onClick={() => toggleFavorite(project.id)}
                  >
                    {project.favorite ? <Star /> : <StarOutline />}
                  </IconButton>
                  <IconButton aria-label="Expand" onClick={handleExpand}>
                    {expanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
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
                      onClick={(e) => {
                        setAnchorEl(null);
                        changeTitle(project.title);
                      }}
                    >
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText>Update Project Title</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        completeProject(project.id);
                      }}
                    >
                      {project.complete ? (
                        <>
                          <ListItemIcon>
                            <DoneAll color="secondary" />
                          </ListItemIcon>
                          <ListItemText>Mark Incomplete</ListItemText>
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <DoneAll color="primary" />
                          </ListItemIcon>
                          <ListItemText>Mark Complete</ListItemText>
                        </>
                      )}
                    </MenuItem>
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
              <div className={classes.tags}>
                <div>
                  <ButtonGroup size="small">
                    {project.tags &&
                      project.tags.map((tag) => (
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
                    size="small"
                    onClick={() => setTagsOpen(!tagsOpen)}
                  >
                    {project.tags && project.tags.length > 0
                      ? 'Add/Edit Tags'
                      : 'Add Tags'}
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
              <CardActionArea className={classes.addAction}>
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
              <Collapse in={expanded} unmountOnExit>
                <List>{project ? renderTasks(project) : 'Add a project'}</List>
              </Collapse>
            </CardContent>
          </Card>
        </>
      );
    }
  };
  const renderTasks = (project) => {
    return project.taskList.map((task, index) => {
      return (
        <Task task={task} index={index} projectID={project.id} key={uuidv4()} />
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
    </>
  );
};

export default Project;
