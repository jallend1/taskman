import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { ProjectContext } from '../Contexts/ProjectContext';
import { AuthContext } from '../Contexts/AuthContext';

const NewProject = () => {
  const { addProject } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const [projectTitle, setProjectTitle] = useState('');

  const useStyles = makeStyles({
    createNew: {
      maxWidth: '80%',
      margin: '2em auto',
      padding: '2em 0'
    },
    submit: {
      display: 'block'
    },
    formSpacing: {
      margin: '2em'
    }
  });

  const classes = useStyles();
  if (user) {
    return (
      <>
        <Paper elevation={3} className={classes.createNew}>
          <Typography variant="h5" align="center">
            Create a New Project
          </Typography>
          <Box align="center">
            <form onSubmit={(e) => addProject(e, projectTitle)}>
              <TextField
                label="Project name"
                onChange={(e) => setProjectTitle(e.target.value)}
                autoFocus
                className={classes.formSpacing}
              />

              <Button
                variant="contained"
                color="secondary"
                size="large"
                type="submit"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default NewProject;
