import { Link as RRDLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  IconButton,
  List,
  ListSubheader,
  Paper,
  Tooltip,
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
      margin: 'auto',
      padding: '1.25em 0em'
    },
    mainList: {
      padding: 0
    },
    cardStyle: {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0
      }
    },
    nextAction: {
      margin: '1.25em'
    },
    progress: {
      fontSize: '0.67em'
    }
  });
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" align="center">
        Next Actions
      </Typography>
      <List className={classes.mainList}>
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
                <CardContent className={classes.cardStyle}>
                  <Task
                    projectID={project.id}
                    task={project.taskList[0]}
                    index={0}
                  />
                  <Typography
                    variant="subtitle2"
                    align="right"
                    className={classes.progress}
                  >
                    {remainingActions} tasks out of {totalActions} remaining in{' '}
                    {project.title}
                    <Tooltip title="Go to project">
                      <IconButton
                        aria-label="Go to project"
                        component={RRDLink}
                        to={`/project/${project.id}`}
                      >
                        <ArrowForwardOutlined />
                      </IconButton>
                    </Tooltip>
                  </Typography>
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
