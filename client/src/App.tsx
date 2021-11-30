import React, { useState } from 'react';
import './App.css';
import Startpage from './Components/Startpage/Startpage';
import Homepage from './Components/TeacherHomepage/Homepage';
import StudentDashboard from './Components/StudentView/StudentDashboard';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div className='App'>
      <Startpage />
    </div>
  );
}

export default App;
