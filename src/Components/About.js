import { Typography } from "@material-ui/core";
import V1 from '../v1/Components/Home'

const About = () => {
    return (
        <>
        <Typography variant="h2">About</Typography>
        <Typography variant="body1">Just a basic little tasklist app.</Typography>
        <Typography variant="h5">Explore previous versions: </Typography>
        <img src="./images/version1.jpg" alt="Layout of version 1"/>
        {/* <V1 /> */}
        </>

    )
}

export default About;