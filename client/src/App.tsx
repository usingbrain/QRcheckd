import React, { useState } from 'react';
import './App.css';
import Startpage from './Components/Startpage/Startpage';
import Homepage from './Components/TeacherHomepage/Homepage';

function App() {
  const [auth, setAuth] = useState(false);

  return <div className="App">{auth ? <Homepage /> : <Startpage />}</div>;
}

export default App;


