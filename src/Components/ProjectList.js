import { useContext, useState, useEffect } from 'react';
import { Link as RRDLink, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import Project from './Project';

import { Button, capitalize, Grid, Typography } from '@material-ui/core';

const ProjectList = () => {
  const [tagFilter, setTagFilter] = useState(false);

  // Extracts tag from parameters
  const TagFilter = () => {
    const { tagID } = useParams();
    return tagID;
  };

  const { projects, isFetching } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  let { filter } = useParams();
  // If filter doesn't extract anything, extract tag property
  if (!filter) filter = TagFilter();
  const routeLocation = useLocation();

  // If path contains the word "tag," sets state as such to filter projects by tag
  useEffect(
    () =>
      routeLocation.pathname.includes('tag')
        ? setTagFilter(true)
        : setTagFilter(false),
    [routeLocation.pathname]
  );

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

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h3">{capitalize(filter)} Projects</Typography>
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
