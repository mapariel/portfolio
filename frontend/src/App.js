import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Projects from './components/Projects.js'
import { PageProject} from './components/Project.js'


import {
   Routes,
   Route, Link, useMatch,
} from "react-router-dom"



const About = () => (
  <h2>About</h2>
)



const App = () => {


  const [projects, setProjects] = useState([])

  useEffect(() => {    
    console.log('effect')    
    axios.get('http://localhost:9091/api/')      
    .then(response => {       
       console.log('promise fulfilled')        
       setProjects(response.data)      
      })  }, [])  
    console.log('render', projects.length, 'projects')

    const padding  = {
      padding : 5
    }

    const match = useMatch('/project/:id')
    const project = match ? 
      projects.find( project => project.id === match.params.id ) : null 
  


    return(
      <div className="container-fluid">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/">home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/about">about</Link>
            </li>
          </ul>
          </div>
        </nav>
        <div className="container-fluid">

        <h1> Projects </h1>    


        <Routes>
          <Route path='/'>
            <Route index element={<Projects projects={projects}/>} />
            <Route path='about' element={<About />} />
            <Route path='project/:id' element={<PageProject project={project} />}  /> 
          </Route>
         </Routes>
         </div>
       </div>   
    )
}


export default App;