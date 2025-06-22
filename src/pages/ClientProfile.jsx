import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './clientProfile.css';

const clientData = {
  1: {
    name: 'Anaya',
    email: 'anaya@example.com',
    phone: '9876543210',
    tag: 'long-term',
    notes: 'Has been a client for over a year. Reliable and consistent.',
    invoices: ['#INV-001', '#INV-005', '#INV-012']
  },
  2: {
    name: 'Kabir',
    email: 'kabir@example.com',
    phone: '9123456789',
    tag: 'referral',
    notes: 'Referred by Anaya. Prompt with payments.',
    invoices: ['#INV-002', '#INV-007']
  },
  3: {
    name: 'Siwach',
    email: 'siwach@example.com',
    phone: '9012345678',
    tag: 'slow payer',
    notes: 'Occasional delays in payment. Good design feedback.',
    invoices: ['#INV-003']
  },
  4: {
    name: 'Amber',
    email: 'amber@gmail.com',
    phone:  '9852147630', 
    tag: 'long-term',
    notes: 'Has been a client for over a year. Reliable and consistent.',
    invoices: ['#INV-003', '#INV-007', '#INV-013']
  }
};

export default function ClientProfile() {
  const { id } = useParams();
  const client = clientData[id];
  const navigate = useNavigate();

  if (!client) return <div className="client-profile">Client not found.</div>;

  return (
    <div className="client-profile">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>{client.name}</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Tag:</strong> <span className="tag">{client.tag}</span></p>
        <p><strong>Notes:</strong> {client.notes}</p>
        <p><strong>Invoices:</strong></p>
        <ul>
          {client.invoices.map((inv, i) => <li key={i}>{inv}</li>)}
        </ul>
        <a href={`mailto:${client.email}`} className="contact-btn">📧 Contact Client</a>
      </div>
    </div>
  );
}
