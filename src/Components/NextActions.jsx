import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import Task from './Task';

const NextActions = () => {
  const { projects } = useContext(ProjectContext);
  return (
    <div>
      {projects.map((project) => {
        if (!project.complete && !project.archived) {
          return (
            <Task projectID={project.id} task={project.taskList[0]} index={0} />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default NextActions;
