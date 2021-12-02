//@ts-nocheck

import React from 'react';
import './App.css';
import { Provider, createClient } from 'urql';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './Components/TeacherHomepage/Homepage';
import Login from './Components/Startpage/Welcome/Login';
import Register from './Components/Startpage/Welcome/Register';
import Welcome from './Components/Startpage/Welcome/Welcome';
import Instruction from './Components/TeacherHomepage/Instruction';
import ClassView from './Components/ClassView/ClassView';
import StudentDashboard from './Components/StudentView/StudentDashboard';
import QrView from './Components/QrView/QrView';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route path="/homepage" element={<Homepage />}>
              <Route
                path="/homepage/dashboard"
                element={<Instruction />}
              ></Route>
              <Route
                // optional route /:id
                path="/homepage/classes/:courseId"
                element={<ClassView />}
              ></Route>
            </Route>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/session" element={<QrView />} />
            <Route path="/student" element={<StudentDashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
