import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, editTransaction, deleteTransaction }) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          editTransaction={editTransaction}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </div>
  );
};

export default TransactionList;
