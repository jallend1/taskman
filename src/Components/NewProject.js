import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const NewProject = ({ addProject }) => {
  const [projectTitle, setProjectTitle] = useState("");

  const useStyles = makeStyles({
    createNew: {
      maxWidth: "80%",
      margin: "2em auto",
    },
    submit: {
      display: "block",
    },
    formSpacing: {
      margin: "2em",
    },
  });

  const classes = useStyles();
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
};

export default NewProject;
