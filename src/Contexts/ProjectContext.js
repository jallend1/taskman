import React, {createContext} from 'react';

export const ProjectContext = createContext();

class ProjectContextProvider extends React.Component {
render() {
    return (
      <ProjectContext.Provider value={{test: 'test'}}>
        {this.props.children}
      </ProjectContext.Provider>
    );
  }
}
export default ProjectContextProvider;
