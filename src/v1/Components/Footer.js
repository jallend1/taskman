import { Typography, makeStyles } from "@material-ui/core";

const Footer = () => {
  const useStyles = makeStyles({
    root: {
      color: "#f0f6f6",
    }
  })

  const classes = useStyles();
  return (
    <Typography variant="h6" align="center" className={classes.root}>
      Made by Jason
    </Typography>
  );
};

export default Footer;
