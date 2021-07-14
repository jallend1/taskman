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
      tags: [],
      isFetching: true,
      drawerOpen: true
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
      db.collection('users')
        .doc(userID)
        .onSnapshot((userProfile) => {
          const tags = userProfile.data().tags || [];
          this.setState({ tags });
        });
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
      favorite: false,
      tags: []
    };
    newProjectRef.set(newProject);
    this.props.history.push(`/project/${newProject.id}`);
  };

  addTag = (projectID, tags) => {
    // Takes copy of current tags array from state
    const currentTags = [...this.state.tags];
    // Converts incoming tags into array
    if (typeof tags === 'string') {
      tags = tags.toLowerCase().split(',');
    }
    // If the incoming tags aren't already in the list of users tags, adds it
    tags.forEach((tag) => {
      if (!currentTags.includes(tag)) {
        currentTags.push(tag.trim());
      }
    });
    // Updates the tags on the individual project
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ tags });
    // Updates the tags on the user's profile list of tags
    db.collection('users').doc(this.state.uid).update({ tags: currentTags });
  };
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
    targetProject.archived = !targetProject.archived;
    if (targetProject.archived) targetProject.active = false;
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({
        archived: targetProject.archived,
        active: targetProject.active
      });
  };

  completeProject = (projectID) => {
    const targetProject = this.state.projects.find(
      (project) => project.id === projectID
    );
    const complete = !targetProject.complete;
    if (complete) {
      targetProject.taskList.forEach((task) => (task.isComplete = true));
      targetProject.active = false;
    }
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({
        complete,
        taskList: targetProject.taskList,
        active: targetProject.active
      });
  };

  completeTask = (projectID, index) => {
    const projectsCopy = this.state.projects.slice();
    const targetProject = projectsCopy.find(
      (project) => project.id === projectID
    );
    targetProject.taskList[index].isComplete =
      !targetProject.taskList[index].isComplete;
    const completedItem = targetProject.taskList.splice(index, 1);
    // Moves completed item to the end of the array
    if (completedItem[0].isComplete) {
      targetProject.taskList.push(completedItem[0]);
    }
    // If item is being marked incomplete, plops it back at the front of the array
    else {
      targetProject.taskList.unshift(completedItem[0]);
    }
    // If the latest task was the last incomplete one, updates entire project to complete
    const complete = targetProject.taskList.every(
      (task) => task.isComplete === true
    );
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ taskList: targetProject.taskList, complete });
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
    const targetProject = projectsCopy.find(
      (project) => projectID === project.id
    );
    targetProject.taskList.splice(index, 1);
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ taskList: targetProject.taskList });
  };

  editTask = (e, projectID, index, newTaskName) => {
    e.preventDefault();
    const projectsCopy = this.state.projects;
    const targetProject = projectsCopy.find(
      (project) => project.id === projectID
    );
    targetProject.taskList[index].action = newTaskName;
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ taskList: targetProject.taskList });
  };

  toggleFavorite = (projectID) => {
    const targetProject = this.state.projects.find(
      (project) => project.id === projectID
    );
    const newFavorite = !targetProject.favorite;
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ favorite: newFavorite });
  };

  updateProjectName = (projectID, newTitle) => {
    db.collection('userProjects')
      .doc(this.state.uid)
      .collection('projects')
      .doc(projectID)
      .update({ title: newTitle });
  };

  render() {
    return (
      <ProjectContext.Provider
        value={{
          projects: this.state.projects,
          tags: this.state.tags,
          isFetching: this.state.isFetching,
          drawerOpen: this.state.drawerOpen,
          addTag: this.addTag,
          addTask: this.addTask,
          addProject: this.addProject,
          archiveProject: this.archiveProject,
          completeProject: this.completeProject,
          completeTask: this.completeTask,
          deleteProject: this.deleteProject,
          deleteTask: this.deleteTask,
          editTask: this.editTask,
          handleDrawer: this.handleDrawer,
          toggleFavorite: this.toggleFavorite,
          updateProjectName: this.updateProjectName
        }}
      >
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
// Exports HOC with access to history
export default withRouter(ProjectContextProvider);
