import React, { useState } from 'react';

const TransactionForm = ({ addTransaction }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = { type, amount, date, notes };
    addTransaction(newTransaction);
    setAmount(''); setDate(''); setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
