
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Grid from '../components/Grid'
import Home from '../components/Home'

function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/grid' element={<Grid/>} ></Route>
    </Routes>
  )
}

export default AllRoutes