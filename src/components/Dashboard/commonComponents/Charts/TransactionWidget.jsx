// src/commonComponents/Charts/TransactionWidget.jsx
import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './TransactionWidget.css';
import {trendUp} from '../../icons/trendup';
import {trendDown} from '../../icons/trenddown';

import { TransactionsIcon } from '../../icons/transactions-icon';

const transactions = [
    {
        "name": "payuguru@dbs",
        "symbol": "IUPI",
        "value": "31",
        "change": "+1%",
        "isPositive": true,
        "data": [
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31
        ]
      },
      {
        "name": "9459945994599459",
        "symbol": "MOBILE COLLECTION",
        "value": "2",
        "change": "+1%",
        "isPositive": true,
        "data": [
          1,
          2
        ]
      },
      {
        "name": "945994599459",
        "symbol": "NEFT PAYMENT",
        "value": "1",
        "change": "+1%",
        "isPositive": true,
        "data": [
          1
        ]
      },
  // { name: 'Silver', symbol: 'Silver', change: '-0.57%', value: '33.59', isPositive: false, data: [33.8, 33.7, 33.6, 33.5, 33.59] },
  // { name: 'USD/INR', symbol: 'USD/INR', change: '-0.06%', value: '84.05', isPositive: false, data: [84.1, 84.0, 84.05, 84.03, 84.05] },
];

export function TransactionWidget() {
  return (
    <div className=" h-theme transaction-widget">
      <div className="header">
        <span className="title">Accounts transactions overview <TransactionsIcon /></span>
        {/* <span className="menu-icon">...</span> */}
        
      </div>
      
      <div className="transactions-list">
        {transactions.map((transaction, index) => (
          <div key={index} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-name">{transaction.name}</span>
              <span className="transaction-symbol">{transaction.symbol}</span>
            </div>
            <div className="transaction-details">
              <span
                className={`transaction-change ${transaction.isPositive ? 'positive' : 'negative'}`}
              >
                {transaction.isPositive ? <FaArrowUp /> : <FaArrowDown />} {transaction.change}
                {/* {transaction.isPositive ? <trendUp /> : <trendDown />} {transaction.change} */}
              </span>
              <span className="transaction-value">₹ {transaction.value}</span>
            </div>
            <div className="transaction-chart">
              <Sparklines data={transaction.data} width={80} height={20} margin={5}>
                <SparklinesLine color={transaction.isPositive ? '#28a745' : '#dc3545'} />
              </Sparklines>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="footer">
        <a href="#" className="see-more">View More</a>
      </div> */}
    </div>
  );
}

// export default TransactionWidget;
