import React from 'react';
import {Link} from "react-router-dom"


const About = () => (
    <div className="row">
        <div className='mt-3'>
            This Single Page Application is created with ReactJS. The backend API uses Django Restful and can 
            be accessed  <a href={BASE_API}>here</a>.

        </div>


        <div className='mt-3'> Github account : <a href='https://github.com/mapariel/'>https://github.com/mapariel/</a> </div>

        <div className='mt-3'> Linkedin account : <a href='https://www.linkedin.com/in/martin-moritz-helsinki/'>https://www.linkedin.com/in/martin-moritz-helsinki/</a> 
        <p/>
        <Link className="btn btn-primary" to='/'>back</Link>
        
        
        </div>



    </div>    
)



export default About;
