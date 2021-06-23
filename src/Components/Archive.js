import { useContext } from 'react';
import {Link as RRDLink } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { ProjectContext } from '../Contexts/ProjectContext';
import Project from './Project';
import Footer from './Footer';
import { Button, Typography } from '@material-ui/core';

const Archive = () => {
    const { projects, isFetching } = useContext(ProjectContext);
    const { user } = useContext(AuthContext);

    const noProjects = () => {
        return (
          <>
            <Typography variant="h4">You haven't made any projects yet.</Typography>
            <Button
              variant="contained"
              color="secondary"
              component={RRDLink}
              to="/new"
            >
              Create a project
            </Button>
          </>
        );
      };
    const notLoggedIn = () => {
        return (
          <>
            <Typography variant="h1" align="center">
              TaskMan
            </Typography>
              <Typography paragraph align="center">
                Log in, and then we can scope out any archived projects.
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
        return projects.filter(project => project.isArchived).map((project) => {
          return <Project key={project.id} projectID={project.id} />;
        });
      };

    return (
        <>
          {user ? (
            <div >
              {/* Loading message while fetching  */}
              {isFetching && <Typography>Getting your projects...</Typography>}
              {/* If projects exist, renders them */}
              {projects.length > 0 && (
                <div>{renderProjects()}</div>
              )}
              {/* If fetching is complete and no projects, tells you to make one */}
              {!isFetching && projects.length === 0 ? noProjects() : null}
              <Footer />
            </div>
          ) : (
            notLoggedIn()
          )}
        </>
      );
}

export default Archive;