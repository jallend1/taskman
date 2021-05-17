import { useState, useEffect } from 'react';
import Project from './Project';
import NewProject from './NewProject';
// import About from './About';
const Home = () => {
  const sampleProject = {
    title: 'My First Project!',
    createdAt: new Date(),
    id: 5000,
    taskList: [
      { action: 'Play Mario Kart', isComplete: true },
      { action: 'Do laundry', isComplete: false },
      { action: 'Union meeting', isComplete: false }
    ]
  };

  const storedProject = JSON.parse(localStorage.getItem('project')) || '';
  const [project, setProject] = useState(storedProject);

  
  
  const addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== '') {
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
      createdAt: new Date(),
      id: Math.random(),
      taskList: []
    };
    setProject(newProject);
  };

    // When project changes, updates version stored locally
    useEffect(() => localStorage.setItem('project', JSON.stringify(project)), [project]);

  return (
    <>
      {/* <About /> */}
      {project ? (
        <Project
          key={project.id}
          project={project}
          completeTask={completeTask}
          addTask={addTask}
          deleteTask={deleteTask}
        />
      ) : (
        <NewProject addProject={addProject} />
      )}
    </>
  );
};

export default Home;
