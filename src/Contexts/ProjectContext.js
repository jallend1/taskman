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
    db.collection('projects')
      .doc('sample')
      .onSnapshot(doc => this.setState({ projects: [doc.data().sampleProject]}));
      // .get()
      // .then((doc) => this.setState({ projects: [doc.data().sampleProject] }));
  };

  addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== '') {
      const projectsCopy = this.state.projects;
      projectsCopy[0].taskList.push({ action: newTask, isComplete: false });
      this.setState(
        { projects: projectsCopy },
        console.log(this.state.projects)
      );
    }
    e.target.reset();
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{ projects: this.state.projects, addTask: this.addTask }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
