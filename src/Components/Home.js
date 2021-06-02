import { useContext } from 'react';
import { Link as RRDLink } from 'react-router-dom';
import Project from './Project';
import Footer from './Footer';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { ProjectContext } from '../Contexts/ProjectContext';

const Home = () => {
  const { projects } = useContext(ProjectContext);
  const useStyles = makeStyles({
    root: {
      // background: '#084b83',
      height: '100vh',
      padding: '1em 0'
    },
    projects: {
      display: "flex",
      flexWrap: "wrap"
    }
  });
  const classes = useStyles();

  const renderProjects = () => {
    return projects.map((project) => {
      return <Project key={project.id} projectID={project.id} />;
    })
  };

  return (
    <>
      <div className={classes.root}>
        {projects.length > 0 ? (
          <div className={classes.projects}>
          {renderProjects()}
          </div>
        ) : (
          <>
            <Typography variant="h4">
              You haven't made any projects yet.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              component={RRDLink}
              to="/new"
            >
              Create a project
            </Button>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
