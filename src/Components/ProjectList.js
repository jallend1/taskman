import { useContext } from 'react';
import { Link as RRDLink, useParams } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import Project from './Project';

import { Button, capitalize, Typography } from '@material-ui/core';

const ProjectList = () => {
  const { projects, isFetching } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const { filter } = useParams();

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
    filter === 'all' ? filteredProjects = projects : filteredProjects = projects.filter((project) => project[filter]);
    // const filteredProjects = projects.filter((project) => project[filter]);
    if (filteredProjects.length === 0) {
      return (
        <Typography variant="h6">
          Looks like you don't have any {capitalize(filter)} projects.
        </Typography>
      );
    } else
      return filteredProjects.map((project) => {
        return <Project key={project.id} projectID={project.id} />;
      });
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
