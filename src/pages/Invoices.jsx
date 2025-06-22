import React, { useState, useEffect } from 'react';
import './invoices.css';

const Invoices = () => {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    client: '',
    project: '',
    amount: '',
    status: 'pending'
  });

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addInvoice = (e) => {
    e.preventDefault();
    if (!form.client || !form.project || !form.amount) return alert("Fill all fields");

    const newInvoice = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setForm({ client: '', project: '', amount: '', status: 'pending' });
  };

  const total = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);

  return (
    <section className="invoice-section">
      <h2>Invoices</h2>

      <form className="invoice-form" onSubmit={addInvoice}>
        <input type="text" name="client" placeholder="Client Name" value={form.client} onChange={handleChange} />
        <input type="text" name="project" placeholder="Project" value={form.project} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount ₹" value={form.amount} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Add Invoice</button>
      </form>

      <div className="invoice-summary">
        <h4>Total Amount: ₹{total}</h4>
      </div>

      <div className="invoice-list">
        {invoices.length === 0 ? (
          <p>No invoices yet.</p>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className={`invoice-card ${inv.status}`}>
              <div>
                <h4>{inv.project}</h4>
                <p><strong>Client:</strong> {inv.client}</p>
                <p><strong>Amount:</strong> ₹{inv.amount}</p>
                <p><strong>Status:</strong> <span className="badge">{inv.status}</span></p>
                <p><strong>Date:</strong> {inv.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Invoices;


