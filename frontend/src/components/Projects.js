import React from 'react'
import {Project} from '../components/Project.js'


const Projects = ({projects}) => {

  console.log("projets: ",projects)
  
  return(
  <div className="row  row-cols-md-1 row-cols-lg-4">
    {projects.map( (project) => <div className="card  p-4 " key = {project.id} >  <Project project={project} />  </div> ) }
  </div>
  )
  }



  export default Projects;
