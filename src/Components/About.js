import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
// import V1 from '../v1/Components/Home'

const About = () => {
  const useStyles = makeStyles({
    root: {
      maxWidth: 550,
      padding: '1em',
      margin: '1.25em auto'
    },
    preview: {
      height: 500,
      width: 500
    }
  });
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" align="center">
        About
      </Typography>
      <Typography variant="body1">Just a basic little tasklist app.</Typography>
      <Typography variant="h5">Explore previous versions: </Typography>
      {/* <V1 /> */}
      <Card className={classes.root}>
        <CardHeader title="Version 1.0"></CardHeader>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.preview}
            image="./images/version1.jpg"
            alt="Layout of version 1.0"
          />
          <CardContent>
            <Typography>
              Basic todo list styled with Material-UI, incorporating basic
              functionality including:
            </Typography>
            <List>
              <ListItem>Mark Tasks Complete</ListItem>
              <ListItem>Delete Tasks</ListItem>
              <ListItem>Adding Items</ListItem>
              <ListItem>Deleting List and Starting Fresh</ListItem>
              <ListItem>List persistence in local storage</ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className={classes.root}>
        <CardHeader title="Version 2.0"></CardHeader>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.preview}
            image="./images/version2.jpg"
            alt="Layout of version 2.0"
          />
          <CardContent>
            <List>
              <ListItem>
                Implemented email/password and Google authentication
              </ListItem>
              <ListItem>Firebase integration</ListItem>
              <ListItem>Implements routes with React-Router-DOM</ListItem>
              <ListItem>Expanded support to multiple tasklists</ListItem>
              <ListItem>
                Landing page welcoming users and directing them to the login
                page
              </ListItem>
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default About;
