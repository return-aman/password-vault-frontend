import React from 'react'

const SavedPasswords = () => {
  return (
    <div>
      <h3>Saved Passwords</h3>
      <div>
        {vaultItems.map((item) => {
          let decryptPassword = '';
          try {
            decryptPassword = decryptData(item.password);
          } catch (error) {
            decryptPassword = '[Encrypted]';
          }
          return (
            <div key={item.id}>
              <strong>{item.title}</strong>
              <p>Username: {item.username}</p>
              <p>Password: {decryptPassword}</p>
              <p>URL: {item.url}</p>
              <p>Notes: {item.notes}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default SavedPasswords
