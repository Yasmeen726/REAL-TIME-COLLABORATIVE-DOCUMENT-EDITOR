// client/src/App.js
import React, { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import UserList from './components/UserList';
import socket from './services/socketService';

function App() {
  const documentId = 'my-document';
  const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('userList', (userList) => {
            setUsers(userList);
        });
        return () => {
            socket.off('userList');
        };
    }, []);

  return (
    <div className="App">
      <Toolbar />
      <Editor documentId={documentId} />
      <UserList users={users} />
    </div>
  );
}

