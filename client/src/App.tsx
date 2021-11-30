import React, { useState } from 'react';
import './App.css';
import Register from './Components/Startpage/Register';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function App() {
  const [auth, setAuth] = useState(true);

<<<<<<< HEAD
  return <div className="App">{auth ? <Homepage /> : <Startpage />}</div>;
=======
  return (
    <Provider value={client}>
      <div className='App'>
        <Register />
      </div>
    </Provider>
  );
>>>>>>> acd0120a31f4ee27b201b4ea710a0c4cf47d3d13
}

export default App;
