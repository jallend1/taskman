import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
        Currently logged in as: {user.displayName}
        </div>
    )
}

export default Profile;