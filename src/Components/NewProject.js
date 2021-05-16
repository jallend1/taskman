import {useState} from 'react';
import { TextField, Typography } from "@material-ui/core";

const NewProject = ({addProject}) => {
    const [projectTitle, setProjectTitle] = useState('')
    
    return (
        <>
        <Typography variant="h2">Create a New Project</Typography>
        <form onSubmit={(e) => addProject(e, projectTitle)}>
            <TextField label="Project name" onChange={e => setProjectTitle(e.target.value)}/>
        </form>
        </>
    )
}

export default NewProject;