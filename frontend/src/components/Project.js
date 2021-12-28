import React from 'react';
import {Link} from "react-router-dom"
  

const Project = ( {project} ) =>(
    <div className="card" style={{width:"300px",}}>
            <img className="card-img-top" src={project.image} alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">{project.title}</h4>
            <p className="card-text">{project.in_brief}</p>
            
            <Link className="btn btn-primary" to={`/project/${project.id}`}>more</Link>
        </div> {/* */}
        </div>
)


const PageProject = ( {project} ) =>(
    <div>
    <h2>{project.title}</h2>
    <div>{project.in_brief}</div>
    <div>{project.description}</div>
    <div>{project.url}</div>
    <div>{project.source}</div>
    <Link to={`/project/${project.id}`}>more</Link>
    </div>
)




export  {Project, PageProject, };


