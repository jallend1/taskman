import { useState, useContext } from "react";
import Project from "./Project";
import NewProject from "./NewProject";
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';
import { ProjectContext } from '../Contexts/ProjectContext';

const Home = () => {
  const {projects} = useContext(ProjectContext);
  const useStyles = makeStyles({
    root: {
        background: "#084b83",
        height: "100vh",
        padding: "1em 0"
      }
    }
  )
  const classes = useStyles();
  
  const renderProjects = () => {
    return projects.map(project => {
      return (
      <Project
        key={project.id}
        project={project}
      />
    )})
  }

  return (
    <>
      <div className={classes.root}>
      {projects.length > 0 ? renderProjects() : <NewProject /> }
      <Footer />
      </div>
    </>
  );
};

export default Home;
