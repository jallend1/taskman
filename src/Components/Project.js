import {Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles } from '@material-ui/core';
const Project = ({project, completeTask}) => {
    const useStyles = makeStyles({
        completed: {
            textDecoration: 'line-through',
            opacity: .4
        }
    })

    const classes = useStyles();

    const renderProjects = () => {
        return project.taskList.map((task, index) => {
            return (
                <ListItem key={task.action} >
                    <ListItemIcon>
                        <Checkbox checked={task.isComplete} onClick={() => completeTask(project.id, index)} />
                    </ListItemIcon>
                    <ListItemText primary={task.action} className={task.isComplete ? classes.completed : null}/>
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