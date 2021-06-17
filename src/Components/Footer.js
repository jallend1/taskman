import { Typography, makeStyles } from '@material-ui/core';

const Footer = () => {
  const useStyles = makeStyles({
    root: {
      color: 'green'
    }
  });

  const classes = useStyles();
  return (
    <Typography component="footer" align="center" className={classes.root}>
      Made by Jason
    </Typography>
  );
};

export default Footer;
