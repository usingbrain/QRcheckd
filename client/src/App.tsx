//@ts-nocheck

import React from 'react';
import './App.css';
import { Provider, createClient } from 'urql';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/TeacherHomepage/Homepage';
import Login from './Components/Startpage/Welcome/Login';
import Register from './Components/Startpage/Welcome/Register';
import Welcome from './Components/Startpage/Welcome/Welcome';
import ClassView from './Components/ClassView/ClassView';
import StudentDashboard from './Components/StudentView/StudentDashboard';
import QrView from './Components/QrView/QrView';
import Overview from './Components/Calendar/Overview';
import SessionHistory from './Components/Calendar/SessionHistory';
import StudentHistory from './Components/Calendar/StudentHistory';
import MainTeacherView from './Components/TeacherHomepage/MainTeacherView';

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
              {/* <Route path="classes/new-course" element={<AddForm />}></Route> */}
              <Route path=":type" element={<MainTeacherView />}></Route>
              <Route path="classes/:courseId" element={<ClassView />}>
                <Route path="history" element={<Overview />}></Route>
                <Route
                  path=":sessionId/:date"
                  element={<SessionHistory />}
                ></Route>
                <Route
                  path="student/:studentId"
                  element={<StudentHistory />}
                ></Route>
              </Route>
            </Route>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/student" element={<StudentDashboard />}></Route>
            <Route path="/:type/:id" element={<QrView />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
