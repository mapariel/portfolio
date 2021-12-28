import React from 'react'
import {Project} from '../components/Project.js'


const Projects = ({projects}) => {

  console.log("projets: ",projects)
  
  return(
  <div className="row">
    {projects.map( (project) => <div className="col" key = {project.id} >  <Project project={project} />  </div> ) }
  </div>
  )
  }



  export default Projects;
