import {useState} from 'react';
import Project from './Project';
// import About from './About';
const Home = () => {
    const sampleProject = {
        title: 'My First Project!',
        id: 5000,
        taskList: [
            {action: 'Play Mario Kart', isComplete: true}, 
            {action: 'Do laundry', isComplete: false},
            {action: 'Union meeting', isComplete: false}
        ]
    }

    const [project, setProject ] = useState(sampleProject)


    const completeTask = (projectID, index) => {
        // Passing in project ID so we can navigate to correct project once multiple project functionality rolled out
        // Creates deep copy of current project
        const projectCopy = JSON.parse(JSON.stringify(project));
        projectCopy.taskList[index].isComplete = !projectCopy.taskList[index].isComplete;
        setProject(projectCopy)
    }

    return (
        <>
            <h1>Home!</h1>
            {/* <About /> */}
            <Project key={project.id} project={project} completeTask={completeTask}/>
        </>
    )
}

export default Home;