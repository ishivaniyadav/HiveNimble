import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './clientList.css';

const mockClients = [
  { id: 1, name: 'Anaya', email: 'anaya@example.com', phone: '9876543210', tag: 'long-term' },
  { id: 2, name: 'Kabir', email: 'kabir@example.com', phone: '9123456789', tag: 'referral' },
  { id: 3, name: 'Siwach', email: 'siwach@example.com', phone: '9012345678', tag: 'slow payer' },
  { id: 4, name: 'Amber', email: 'amber@gmail.com', phone:'9852147630', tag: 'long-term'}
];

export default function ClientList() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="client-list-container">
      <h2>Client Directory</h2>
      <input
        type="text"
        placeholder="Search by name..."
        className="client-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="client-grid">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="client-card"
            onClick={() => navigate(`/clients/${client.id}`)}
          >
            <h3>{client.name}</h3>
            <p>{client.email}</p>
            <p>{client.phone}</p>
            <span className="tag">{client.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
