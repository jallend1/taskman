import { useState } from 'react';
import Project from './Project';
// import About from './About';
const Home = () => {
  const sampleProject = {
    title: 'My First Project!',
    createdAt: Date.now(),
    id: 5000,
    taskList: [
      { action: 'Play Mario Kart', isComplete: true },
      { action: 'Do laundry', isComplete: false },
      { action: 'Union meeting', isComplete: false }
    ]
  };

  const [project, setProject] = useState(sampleProject);

  const addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    const projectCopy = JSON.parse(JSON.stringify(project));
    projectCopy.taskList.push({ action: newTask, isComplete: false });
    setProject(projectCopy);
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

  return (
    <>
      <h1>Home</h1>
      {/* <About /> */}
      <Project
        key={project.id}
        project={project}
        completeTask={completeTask}
        addTask={addTask}
        deleteTask={deleteTask}
      />
    </>
  );
};

export default Home;
