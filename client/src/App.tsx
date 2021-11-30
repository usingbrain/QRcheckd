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
  const [auth, setAuth] = useState(false);

  return (
    <Provider value={client}>
      <div className='App'>
        <Register />
      </div>
    </Provider>
  );
}

export default App;
