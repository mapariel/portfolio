import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Projects from './components/Projects.js'
import About from './components/About.js'
import { PageProject} from './components/Project.js'


import {
   Routes,
   Route, Link, useMatch,
} from "react-router-dom"




const App = () => {

  console.log('API: ',BASE_API)


  const [projects, setProjects] = useState([])

  useEffect(() => {    
    console.log('effect')    
    axios.get(BASE_API)      
    .then(response => {       
       console.log('promise fulfilled')        
       setProjects(response.data)      
      })  }, [])  
    console.log('render', projects.length, 'projects')

    const padding  = {
      padding : 5
    }

    const match = useMatch(':id')
    const project = match ? 
      projects.find( project => project.slug === match.params.id ) : null 
  


    return(
      <div className="container-fluid">
        <div className="mt-4 p-5 bg-success text-white rounded">
          <div  className="display-1"  >Portfolio</div>
          <p>My realisations in machine learning and web programming</p>
        </div>


        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/">home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={padding} to="/about">about</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/'>
            <Route index element={<Projects projects={projects}/>} />
            <Route path='about' element={<About />} />
            <Route path=':id' element={<PageProject project={project} />}  /> 
          </Route>
         </Routes>
     </div>   
    )
}


export default App;
