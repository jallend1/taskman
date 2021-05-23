import { useState, useContext } from "react";
import Project from "./Project";
import NewProject from "./NewProject";
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';
import { ProjectContext } from '../Contexts/ProjectContext';

const Home = () => {
  const {projects, addTask} = useContext(ProjectContext);
  console.log(projects)
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

  const completeTask = (projectID, index) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    // Creates deep copy of current project
    const projectCopy = JSON.parse(JSON.stringify(project));
    projectCopy.taskList[index].isComplete =
      !projectCopy.taskList[index].isComplete;
    setProject(projectCopy);
  };

  const deleteTask = (projectID, index) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    // Creates deep copy of current project
    const projectCopy = JSON.parse(JSON.stringify(project));
    projectCopy.taskList.splice(index, 1);
    setProject(projectCopy);
  };

  const deleteProject = (projectID) => {
    // Includes projectID for later functionality when there are multiple projects
    setProject('');
  } 

  return (
    <>
      <div className={classes.root}>
      {project ? (
        <Project
          key={project.id}
          project={project}
          completeTask={completeTask}
          deleteTask={deleteTask}
          deleteProject={deleteProject}
        />
      ) : (
        <NewProject />
      )}
      <Footer />
      </div>
    </>
  );
};

export default Home;
