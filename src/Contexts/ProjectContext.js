import React, { createContext } from 'react';
import { db } from '../firebaseConfig';
import { withRouter } from 'react-router-dom';

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
    this.props.history.push(`/project/${newProject.id}`);
  };

  addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== '') {
      const projectsCopy = this.state.projects;
      const currentProject = projectsCopy.find(
        (project) => project.id === projectID
      );
      currentProject.taskList.push({ action: newTask, isComplete: false });
      db.collection('projects')
        .doc(projectID)
        .update({ taskList: currentProject.taskList });
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
// Exports HOC with access to history
export default withRouter(ProjectContextProvider);
