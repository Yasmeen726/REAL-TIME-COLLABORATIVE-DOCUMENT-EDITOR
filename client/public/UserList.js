// client/src/components/UserList.js
import React from 'react';

function UserList({ users }) {
  return (
    <div>
      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.id}</li>
        ))}
      </ul>
    </div>
  );
}