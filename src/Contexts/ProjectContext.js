import React, { createContext } from 'react';
import { db } from '../firebaseConfig';
import { withRouter } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProjectContext = createContext();

class ProjectContextProvider extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      uid: '',
      isFetching: true
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  componentDidUpdate() {
    const { user } = this.context;
    if (user && user.uid !== this.state.uid) {
      this.retrieveProjects();
    }
    // If the user logs out, clears the projet and uid states
    if (!user && this.state.uid) {
      this.setState({ projects: [], uid: '' });
    }
  }

  retrieveProjects = () => {
    const { user } = this.context;
    if (user) {
      const userID = user.uid;
      db.collection('userProjects')
        .doc(userID)
        .collection('projects')
        .onSnapshot(
          (snapshot) => {
            const fetchedProjects = [];
            snapshot.forEach((doc) => {
              fetchedProjects.push(doc.data());
            });
            this.setState({
              projects: fetchedProjects,
              uid: userID,
              isFetching: false
            });
          },
          (error) => console.log(error)
        );
    } else {
      this.setState({ projects: [], uid: '' });
    }
  };

  addProject = (e, name) => {
    e.preventDefault();
    const newProjectRef = db
      .collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc();
    const newProject = {
      title: name,
      createdAt: Date.now(),
      id: newProjectRef.id,
      taskList: [],
      archived: false,
      complete: false,
      active: true,
      tags: []
    };
    newProjectRef.set(newProject);
    this.props.history.push(`/project/${newProject.id}`);
  };

  addTag = (projectID, tags) => {
    if(typeof tags === 'string'){
      tags = tags.toLowerCase().split(',');
    }
    db.collection('userProjects').doc(this.state.uid).collection('projects').doc(projectID).update({tags})
  }
  addTask = (e, projectID, newTask) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      const projectsCopy = this.state.projects;
      const currentProject = projectsCopy.find(
        (project) => project.id === projectID
      );
      currentProject.taskList.push({ action: newTask, isComplete: false });
      db.collection('userProjects')
        .doc(this.state.uid)
        .collection('projects')
        .doc(projectID)
        .update({ taskList: currentProject.taskList });
    }
    e.target.reset();
  };

  archiveProject = (projectID) => {
    const projectsCopy = this.state.projects;
    const targetProject = projectsCopy.find(
      (project) => project.id === projectID
    );
    targetProject.isArchived = !targetProject.isArchived;
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ isArchived: targetProject.isArchived });
  };

  completeTask = (projectID, index) => {
    const projectsCopy = this.state.projects;
    const targetProject = projectsCopy.find(
      (project) => project.id === projectID
    );
    targetProject.taskList[index].isComplete =
      !targetProject.taskList[index].isComplete;
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ taskList: targetProject.taskList });
  };

  deleteProject = (projectID) => {
    const projectsCopy = this.state.projects;
    const targetProjectIndex = projectsCopy.findIndex(
      (project) => project.id === projectID
    );
    projectsCopy.splice(targetProjectIndex, 1);
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .delete()
      .then(() => console.log('BUHLETED'));
  };

  deleteTask = (projectID, index) => {
    const projectsCopy = this.state.projects;
    const targetProject = projectsCopy.find((project) => project.id);
    targetProject.taskList.splice(index, 1);
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ taskList: targetProject.taskList });
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{
          projects: this.state.projects,
          isFetching: this.state.isFetching,
          addTag: this.addTag,
          addTask: this.addTask,
          addProject: this.addProject,
          archiveProject: this.archiveProject,
          completeTask: this.completeTask,
          deleteProject: this.deleteProject,
          deleteTask: this.deleteTask
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
// Exports HOC with access to history
export default withRouter(ProjectContextProvider);
