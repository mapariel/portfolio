import React from 'react'
import {Project} from '../components/Project.js'


const Projects = ({projects}) => {

  console.log("projets: ",projects)
  
  return(
    <div class="container-fluid">  
  <div className="row">
    {projects.map( (project) => <div className="card col-lg-4  p-4 " key = {project.id} >  <Project project={project} />  </div> ) }
  </div>
  </div>
  )
  }



  export default Projects;
