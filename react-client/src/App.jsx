import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Transaction from './Transaction'

function App() {
  // const [update, setMining] = useState(false)
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [chain, setChain] = useState([])
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)


  const handleChange = (e) => {
    setUsername(e.target.value)
  }
  const handleLogin = (e) => {
    e.preventDefault()
    setLogin(true)
  }
  const refresh = () => {
    setBalance(0)
    if(chain.length > 1 && login === true) {
      let arr = []
      arr = [...chain.map(el => el.transactions)]
      let flattened = [].concat(...arr)
      let userArray = []
      flattened.forEach(el => {
        if(el.sender === username || el.recipient.slice(0, -1) === username) userArray.push(el)
        if(el.sender === username) setBalance(b => b -= Number(el.amount))
        if(el.recipient.slice(0, -1) === username) setBalance(b => b += Number(el.amount))
      })
      setTransactions(userArray)
    }
  }
  const handleLogOut = () => {
    setLogin(false)
  }
  useEffect(() => {
    if(login === true) {
      axios.get(`http://localhost:5000/chain`)
      .then(res => {
        setChain(res.data.chain)
      })
      .catch(err => console.log(err.response))
    }
  }, [login])
  useEffect(() => {
    setBalance(0)
    if(chain.length > 1 && login === true) {
      let arr = []
      arr = [...chain.map(el => el.transactions)]
      let flattened = [].concat(...arr)
      let userArray = []
      flattened.forEach(el => {
        if(el.sender === username || el.recipient.slice(0, -1) === username) userArray.push(el)
        if(el.sender === username) setBalance(b => b -= Number(el.amount))
        if(el.recipient.slice(0, -1) === username) setBalance(b => b += Number(el.amount))
      })
      setTransactions(userArray)
    }
  }, [login, chain])
  console.log(username)
  console.log(balance)
  console.log(chain)
  console.log(transactions)
  return (
    <div className="App">
      <header className="App-header">
        <h3 style={{justifySelf: 'flex-start'}}>Your Lambda Wallet</h3>
        {login && <>
          <button onClick={refresh}>Refresh</button>
          <button onClick={handleLogOut}>Log Out</button>
        </>}
      </header>
      {login && <>
        <h3>{username}</h3>
        <h3>Coin Balance: {balance}</h3>
      </>}
      <div className='App-content'>
        {!login ? <form onSubmit={handleLogin}>
          <input name='username' onChange={handleChange} value={username}></input>
          <button>Log In</button>
        </form> : <>
          {transactions.length > 0 && transactions.map(transaction => <Transaction transaction={transaction} />)}
        </>}
      </div>
    </div>
  );
}

export default App;
