import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home'
import ManLeagues from './ManLeagues'
import LeagueForm from './forms/LeagueForm'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider>
    <Router>
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/leagues/manage' element={<ManLeagues />} />
        <Route exact path='/leagues/form' element={<LeagueForm />} />
        <Route exact path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  </ChakraProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
