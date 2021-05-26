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

  // If existing project in localStorage, populates that. If not, defaults to blank
  const storedProject = JSON.parse(localStorage.getItem("project")) || "";
  const [project, setProject] = useState(storedProject);

  const deleteProject = (projectID) => {
    // Includes projectID for later functionality when there are multiple projects
    setProject('');
  } 

  const renderProjects = () => {
    return projects.map(project => {
      return (
      <Project
        key={project.id}
        project={project}
        deleteProject={deleteProject}
      />
    )})
  }

  return (
    <>
      <div className={classes.root}>
      {projects ? renderProjects() : <NewProject /> }
      <Footer />
      </div>
    </>
  );
};

export default Home;
