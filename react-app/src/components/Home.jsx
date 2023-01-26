import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h2>
            Welcome to the AG Grid Demo By Clicking this button 
            <br />
            <Link to={'/grid'} >
             <button>Lets Gooo....</button>
            </Link>
        </h2>
    </div>
  )
}

export default Home