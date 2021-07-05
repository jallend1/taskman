import { useContext } from 'react';
import { ProjectContext } from '../Contexts/ProjectContext';
import { AuthContext } from '../Contexts/AuthContext';

const NextActions = () => {
    const { projects } = useContext(ProjectContext);
    const { user } = useContext(AuthContext);
    return (
        'hello there'
    )
}

export default NextActions;