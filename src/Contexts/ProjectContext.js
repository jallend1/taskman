import React, { createContext } from 'react';
import { db } from '../firebaseConfig';
export const ProjectContext = createContext();

class ProjectContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  retrieveProjects = () => {
    db.collection('projects').onSnapshot((snapshot) => {
      const fetchedProjects = [];
      snapshot.forEach((doc) => {
        fetchedProjects.push(doc.data());
      });
      this.setState({ projects: fetchedProjects });
    });
  };

  addProject = (e, name) => {
    e.preventDefault();
    const newProjectRef = db.collection('projects').doc();
    const newProject = {
      title: name,
      createdAt: new Date().toDateString(),
      id: newProjectRef.id,
      taskList: []
    };
    newProjectRef.set(newProject);
  };

  addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== '') {
      const projectsCopy = this.state.projects;
      const currentProject = projectsCopy[0];
      currentProject.taskList.push({ action: newTask, isComplete: false });
      db.collection('projects').doc(projectID).update({ currentProject });
    }
    e.target.reset();
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{
          projects: this.state.projects,
          addTask: this.addTask,
          addProject: this.addProject
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
