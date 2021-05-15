import {Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
const Project = ({project, completeTask}) => {
    return (
        <>
            <Typography variant="h2">{project.title}</Typography>
            <List>
                {project.taskList.map((task, index) => {
                return (
                    <ListItem key={task.action} >
                        <ListItemIcon>
                            <Checkbox checked={task.isComplete} onClick={() => completeTask(project.id, index)}/>
                        </ListItemIcon>
                        <ListItemText primary={task.action} />
                    </ListItem>

                )})}
            </List>
        </>
        
    )
}

export default Project;