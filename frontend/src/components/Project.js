import React from 'react';
import {Link} from "react-router-dom"
  

const Project = ( {project} ) =>(
    <>
          <img   src={project.image} alt="Card image" />
          <div className="card-body">
          <div>
            <h4 className="card-title">{project.title}</h4>
            <p>{project.in_brief}</p>            
        </div>
        <Link className="btn btn-primary btn-block" to={`/${project.id}`}>more</Link>
        </div>
    </>
)


const PageProject = ( {project} ) =>{

  if (!project){ 
    return (<div></div>)
  }

  return(
    <div className="row">
    <div className="col-md-6">
    <img src={project.image} className='img-fluid'></img>
    </div>

    <div className="col-md-6">

    <h2>{project.title}</h2>
    
    <h4 className="mt-4">Description :</h4>
    <div>{project.description}</div>
    <h4 className="mt-4">See the project in action :</h4>
    <a href={project.url} >{project.url}</a>
    <h4 className="mt-4">Source code:</h4>
    
    <a href={project.source}>{project.source}</a>

    <p/>
	   <Link className="btn btn-primary btn-block" to='/'>back</Link>
    </div>



    </div>



)
}




export  {Project, PageProject, };


