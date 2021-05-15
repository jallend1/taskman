import {Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
const Project = ({project, completeTask}) => {
    const renderProjects = () => {
        return project.taskList.map((task, index) => {
            return (
                <ListItem key={task.action} >
                    <ListItemIcon>
                        <Checkbox checked={task.isComplete} onClick={() => completeTask(project.id, index)}/>
                    </ListItemIcon>
                    <ListItemText primary={task.action} />
                </ListItem>

            )})
    }
    return (
        <>
            <Typography variant="h2">{project.title}</Typography>
            <List>
                {project ? renderProjects() : 'Add a project'}
            </List>
        </>
        
    )
}

export default Project;