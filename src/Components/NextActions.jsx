import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import Task from './Task';

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  return (
    <Card>
      <CardHeader title="Next Actions" />
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default NextActions;
