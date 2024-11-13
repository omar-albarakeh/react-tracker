import React from 'react';

const TransactionItem = ({ transaction, editTransaction, deleteTransaction }) => {
  return (
    <div className="transaction-item">
      <p>{transaction.type} - ${transaction.amount} - {transaction.date}</p>
      <button onClick={() => editTransaction(transaction)}>Edit</button>
      <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
    </div>
  );
};

export default TransactionItem;
