import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { encryptData, decryptData } from '../Utils/encryption';
import PasswordGenerator from './PasswordGenerator';

const VaultDashboard = () => {
  const [vaultItems, setVaultItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
  });
  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/vault', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVaultItems(res.data);
    setFilteredItems(res.data);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = vaultItems.filter((item) => {
      item.title?.toLowerCase().includes(lower) ||
        item.username?.toLowerCase().includes(lower) ||
        item.url?.toLowerCase().includes(lower);
    });
    setFilteredItems(filtered);
  }, [searchTerm, vaultItems]);

  const handleAdd = async () => {
    const encryptedPassword = encryptData(newItem.password);
    const dataToSend = {
      ...newItem,
      password: encryptedPassword,
    };
    await axios.post('http://localhost:5000/api/vault', dataToSend, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewItem({ title: '', username: '', password: '', url: '', notes: '' });
    fetchItems();
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/vault/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  return (
    <div>
      <h2>Vault Dashboard</h2>
      <PasswordGenerator
        onGenerate={(pwd) => setNewItem({ ...newItem, password: pwd })}
      />

      <input
        placeholder='Title'
        value={newItem.title}
        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      />
      <input
        placeholder='Username'
        value={newItem.username}
        onChange={(e) => setNewItem({ ...newItem, username: e.target.value })}
      />
      <input
        placeholder='Password'
        value={newItem.password}
        onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
      />
      <input
        placeholder='URL'
        value={newItem.url}
        onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
      />
      <input
        placeholder='Notes'
        value={newItem.notes}
        onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
      />
      <button onClick={handleAdd}>Save Encrypted</button>

      <div style={{ marginTop: '20px' }}>
        <input
          type='text'
          placeholder='Search by title,username or url'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <h3>Saved Passwords</h3>
      <div>
        {vaultItems.length == 0 ? (
          <p>No saved passwords</p>
        ) : (
          vaultItems.map((item) => {
            let decryptedPassword = '';
            try {
              decryptedPassword = decryptData(item.password);
            } catch (error) {
              decryptedPassword = '[Encrypted]';
            }
            return (
              <div key={item.id}>
                <strong>{item.title}</strong>
                <p>Username: {item.username}</p>
                <p>Password: {decryptedPassword}</p>
                <p>URL: {item.url}</p>
                <p>Notes: {item.notes}</p>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VaultDashboard;
