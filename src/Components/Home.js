import { useState, useEffect } from "react";
import Project from "./Project";
import NewProject from "./NewProject";
import NavBar from './NavBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';
// import About from './About';

const Home = () => {
  
  const useStyles = makeStyles({
    root: {
        background: "#084b83",
        height: "100vh"
      }
    }
  )
  const classes = useStyles();

  const sampleProject = {
    title: "My First Project!",
    createdAt: new Date().toDateString(),
    id: 5000,
    taskList: [
      { action: "Play Mario Kart", isComplete: true },
      { action: "Do laundry", isComplete: false },
      { action: "Union meeting", isComplete: false },
    ],
  };

  // If existing project in localStorage, populates that. If not, defaults to blank
  const storedProject = JSON.parse(localStorage.getItem("project")) || "";
  const [project, setProject] = useState(storedProject);

  // When project changes, updates version stored locally
  useEffect(
    () => localStorage.setItem("project", JSON.stringify(project)),
    [project]
  );

  const addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== "") {
      const projectCopy = JSON.parse(JSON.stringify(project));
      projectCopy.taskList.push({ action: newTask, isComplete: false });
      setProject(projectCopy);
    }
    e.target.reset();
  };

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

  const addProject = (e, name) => {
    e.preventDefault();
    const newProject = {
      title: name,
      createdAt: new Date().toDateString(),
      id: Math.random(),
      taskList: [],
    };
    setProject(newProject);
  };

  const deleteProject = (projectID) => {
    // Includes projectID for later functionality when there are multiple projects
    setProject('');
  } 

  return (
    <>
      <div className={classes.root}>
      {/* <About /> */}
      <NavBar />
      {project ? (
        <Project
          key={project.id}
          project={project}
          completeTask={completeTask}
          addTask={addTask}
          deleteTask={deleteTask}
          deleteProject={deleteProject}
        />
      ) : (
        <NewProject addProject={addProject} />
      )}
      <Footer />
      </div>
    </>
  );
};

export default Home;
