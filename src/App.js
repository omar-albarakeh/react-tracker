import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);

  const calculateTotalBudget = (data) => {
    const total = data.reduce((acc, transaction) => {
      return transaction.type === 'income'
        ? acc + parseFloat(transaction.amount)
        : acc - parseFloat(transaction.amount);
    }, 0);
    setTotalBudget(total);
  };

  useEffect(() => {
    fetch('/api/getTransactions.php')
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setTransactions(data);
          calculateTotalBudget(data);
        }
      });
  }, []);

  const addTransaction = (transaction) => {
    fetch('/api/addTransaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTransactions([...transactions, transaction]);
          calculateTotalBudget([...transactions, transaction]);
        }
      });
  };

  const editTransaction = (updatedTransaction) => {
    fetch('/api/editTransaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedTransactions = transactions.map((transaction) =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
          );
          setTransactions(updatedTransactions);
          calculateTotalBudget(updatedTransactions);
        }
      });
  };

  const deleteTransaction = (id) => {
    fetch('/api/deleteTransaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const remainingTransactions = transactions.filter((transaction) => transaction.id !== id);
          setTransactions(remainingTransactions);
          calculateTotalBudget(remainingTransactions);
        }
      });
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <h2>Total Budget: ${totalBudget}</h2>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        editTransaction={editTransaction}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default App;
