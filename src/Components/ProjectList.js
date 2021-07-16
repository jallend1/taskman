import { useContext, useState, useEffect } from 'react';
import { Link as RRDLink, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import Project from './Project';

import { Button, capitalize, Grid, makeStyles, Typography } from '@material-ui/core';

const ProjectList = () => {
  const { projects, isFetching } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const [listView, setListView] = useState(false);
  const [tagFilter, setTagFilter] = useState(false);

  // Extracts tag from parameters
  const TagFilter = () => {
    const { tagID } = useParams();
    return tagID;
  };
  let { filter } = useParams();
  // If filter doesn't extract anything, extract tag property
  if (!filter) filter = TagFilter();
  // If path contains the word "tag," sets state as such to filter projects by tag
  const routeLocation = useLocation();

  useEffect(
    () =>
      routeLocation.pathname.includes('tag')
        ? setTagFilter(true)
        : setTagFilter(false),
    [routeLocation.pathname]
  );

  const useStyles = makeStyles({
    root: {
      display: "flex"
    }
  });

  const classes = useStyles();

  const notLoggedIn = () => {
    return (
      <>
        <Typography variant="h1" align="center">
          TaskMan
        </Typography>
        <Typography paragraph align="center">
          Log in, and then we can scope out any {filter} projects.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={RRDLink}
          to="/login"
        >
          Login Page
        </Button>
      </>
    );
  };
  const renderProjects = () => {
    renderList();
    let filteredProjects = [];
    if (tagFilter) {
      filteredProjects = projects.filter((project) =>
        project.tags.includes(filter)
      );
    } else {
      filter === 'all'
        ? (filteredProjects = projects)
        : (filteredProjects = projects.filter((project) => project[filter]));
    }

    if (filteredProjects.length === 0) {
      return (
        <Typography variant="h6">
          Looks like you don't have any {capitalize(filter)} projects.
        </Typography>
      );
    } else
      return (
        <Grid container justify="center">
          {filteredProjects.map((project) => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={project.id}>
                <Project projectID={project.id} />
              </Grid>
            );
          })}
        </Grid>
      );
  };

  const renderList = () => {
    projects.map(project => console.log(project.title))
  }

  return (
    <>
      {user ? (
        <div>
          <header>
          <Typography variant="h3" align="center">{capitalize(filter)} Projects</Typography>
          <Button onClick={() => setListView(!listView)}> {listView ? 'View as Cards' : 'View As List'}</Button>
          </header>
          {/* Loading message while fetching  */}
          {isFetching && <Typography>Getting your projects...</Typography>}
          {/* If projects exist, renders them */}
          {projects.length > 0 && <div>{renderProjects()}</div>}
        </div>
      ) : (
        notLoggedIn()
      )}
    </>
  );
};

export default ProjectList;
