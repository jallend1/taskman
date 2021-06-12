import { useContext } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import Project from './Project';
import Footer from './Footer';
import {
  Button,
  Container,
  makeStyles,
  Typography,
  Link,
  Paper
} from '@material-ui/core';
import { ProjectContext } from '../Contexts/ProjectContext';
import { AuthContext } from '../Contexts/AuthContext';

const Home = () => {
  const { projects, isFetching } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);

  const useStyles = makeStyles({
    root: {
      // background: '#084b83',
      height: '100vh',
      padding: '1em 0'
    },
    projects: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    blurb: {
      padding: '2em'
    }
  });
  const classes = useStyles();

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
      <Container maxWidth="sm">
        <Typography variant="h1" align="center">
          TaskMan
        </Typography>
        <Paper className={classes.blurb}>
          <Typography paragraph align="center">
            TaskMan is a basic task manager designed with a focus on the
            individual actions that make up your projects.
          </Typography>
          <Typography paragraph align="center">
            Instead of having a single tasklist that is filled with vague goals
            like "Clean the house," I like to have that single project broken up
            into several distinct actions like "Wash the dishes," "Do the
            laundry," and "Take out the trash."
          </Typography>
          <Typography paragraph align="center">
            Breaking down large task into specific and sequential actions makes
            accomplishing large projects much less daunting, and the reward that
            comes with finishing a task serves as a great reminder that progress
            IS being made.{' '}
          </Typography>
          <Typography variant="h5" className={classes.blurb} align="center">
            Log in or create an account to get started!
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
        </Paper>
      </Container>
    );
  };
  const renderProjects = () => {
    return projects.map((project) => {
      return <Project key={project.id} projectID={project.id} />;
    });
  };

  return (
    <>
      {user ? (
        <div className={classes.root}>
          {isFetching && <Typography>Loading...</Typography>}
          {projects.length > 0 ? (
            <div className={classes.projects}>{renderProjects()}</div>
          ) : (
            noProjects()
          )}
          <Footer />
        </div>
      ) : (
        notLoggedIn()
      )}
    </>
  );
};

export default Home;
