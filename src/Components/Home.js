import {useState} from 'react';
import Project from './Project';
// import About from './About';
const Home = () => {
    const [project, setProject ] = useState({
        title: 'My First Project!',
        id: 5000,
        taskList: [
            {action: 'Play Mario Kart', isComplete: true}, 
            {action: 'Do laundry', isComplete: false},
            {action: 'Union meeting', isComplete: false}
        ]
    })

    const completeTask = (projectID, index) => {
        // Passing in task so we can navigate to correct project once multiple project functionality rolled out
        const projectCopy = project;
        projectCopy.taskList[index].isComplete = true;
        setProject(projectCopy)
    }


    return (
        <>
            <h1>Home!</h1>
            {/* <About /> */}
            <Project key={project.id} project={project} completeTask = {completeTask}/>
        </>
    )
}

export default Home;