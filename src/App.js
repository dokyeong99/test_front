import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("name");
  const [description, setDescription] = useState("description");
  const [users, setUsers] = useState([]);

  const handleInputChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    fetch('http://35.238.173.75:8080/api/v1/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => setTimeout(() => {
        fetchUserList();
      }, 3000))
      .catch((error) => {
        console.error('API 오류:', error);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    fetch('http://35.238.173.75:8080/api/v1/user')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('API 오류:', error);
      });
  };

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={onSubmitHandler}>
          <h2>Add User</h2>
          <div className="form-input">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
      <div className="user-list">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name},{' '}
              <strong>Description:</strong> {user.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
