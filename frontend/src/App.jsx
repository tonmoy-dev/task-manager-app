import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TaskBoard from './components/TaskBoard'

function App() {

  return (
    <>
      <Navbar />
      <TaskBoard />
    </>
  )
}

export default App
