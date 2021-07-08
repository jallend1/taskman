import { Link as RRDLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  List,
  ListSubheader,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import { ArrowForwardOutlined } from '@material-ui/icons';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import Task from './Task';

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  const useStyles = makeStyles({
    root: {
      margin: 'auto'
    },
    nextAction: {
      margin: '2em'
    }
  });
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" align="center">
        Next Actions
      </Typography>
      <List>
        <ListSubheader align="center">
          The very next action from each of your projects
        </ListSubheader>
        {projects.map((project) => {
          if (!project.complete && !project.archived) {
            const remainingActions = project.taskList.filter(
              (task) => !task.isComplete
            ).length;
            const totalActions = project.taskList.length;
            return (
              <Card key={project.id} className={classes.nextAction}>
                <CardHeader
                  title={project.title}
                  action={
                    <IconButton
                      aria-label="Go to project"
                      component={RRDLink}
                      to={`/project/${project.id}`}
                    >
                      <ArrowForwardOutlined />
                    </IconButton>
                  }
                  subheader={`${remainingActions} tasks out of ${totalActions} remaining`}
                />
                <CardContent>
                  <Task
                    projectID={project.id}
                    task={project.taskList[0]}
                    index={0}
                  />
                </CardContent>
              </Card>
            );
          } else {
            return null;
          }
        })}
      </List>
    </Paper>
  );
};

export default NextActions;
