import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NotesApp from './components/NotesApp'
import Todo from './components/Todo'

const App = () => {
  // useEffect(() => {
  //  alert("Saving data functionality will come soon. Sorry for inconvenience!");
    
  // }, [])
  
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<NotesApp />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
