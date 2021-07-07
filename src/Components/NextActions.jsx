import { List, Paper, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import Task from './Task';

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  return (
    <Paper>
      <Typography variant="h3" align="center">
        Next Actions
      </Typography>
      <List>
        {projects.map((project) => {
          if (!project.complete && !project.archived) {
            return (
              <Task
                projectID={project.id}
                task={project.taskList[0]}
                index={0}
              />
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
