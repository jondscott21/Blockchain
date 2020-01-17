import React from 'react';
import './App.css';

const Transaction = (props) => {
    let date = new Date(props.transaction.time_stamp *1000)
    console.log(date)
    return (
        <div className='transaction'>
            <h4>Date: {date.toString()}</h4>
            <p>Sender: {props.transaction.sender}</p>
            <p>Recipient: {props.transaction.recipient}</p>
            <p>Amount: {props.transaction.amount}</p>
        </div>
    )
}

export default Transaction