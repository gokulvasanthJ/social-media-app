import React, { useContext } from 'react';
import { AuthProvider } from './context/AuthContext';
import PostList from './components/PostList';
import Chat from './components/Chat';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>Social Media App</h1>
        <PostList />
        <Chat />
      </div>
    </AuthProvider>
  );
}

export default App;
