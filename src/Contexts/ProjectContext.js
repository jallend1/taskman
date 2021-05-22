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
    .onSnapshot(snapshot => {
      const fetchedProjects = [];
      snapshot.forEach(doc => {
        fetchedProjects.push(doc.data())
      })
      this.setState({projects: fetchedProjects})
    })
        // doc => doc.forEach(console.log((doc.data()))))
        // this.setState({ projects: [doc.data().sampleProject]}));
      // .get()
      // .then((doc) => this.setState({ projects: [doc.data().sampleProject] }));
  };

  addProject = (e, name) => {
    e.preventDefault();
    const newProject = {
      title: name,
      createdAt: new Date().toDateString(),
      id: Math.random(),
      taskList: [],
    };
    db.collection('projects').add(newProject)
  };

  addTask = (e, projectID, newTask) => {
    // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
    e.preventDefault();
    if (newTask.trim() !== '') {
      const projectsCopy = this.state.projects;
      projectsCopy[0].taskList.push({ action: newTask, isComplete: false });
      db.collection('projects').doc('sample').update({sampleProject: {projectsCopy}})
    }
    e.target.reset();
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{ projects: this.state.projects, addTask: this.addTask, addProject: this.addProject }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
