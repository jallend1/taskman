import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import Task from './Task';

const NextActions = () => {
    const { projects } = useContext(ProjectContext);
    console.log(projects)
    return (
        <div>
        {projects.map(project => <Task projectID = {project.id} task={project.taskList[0]} index={0} />)}
        </div>
    )
}

export default NextActions;