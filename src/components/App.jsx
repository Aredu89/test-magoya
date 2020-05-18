import React, { useState, useEffect } from 'react';

const ListHeader = props => {
  return (
    <div className="list-header d-flex align-items-center">
      <span className="title">Personal transactions</span>
    </div>
  )
}

const App = () => {

  const [data, setData] = useState([])

  useEffect(async () =>{
    const options = {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('/api/transactions', options)
    const result = await response.json()

    console.log("transactions: ",result)
  })

  return (
    <div className="app">
      <ListHeader />
    </div>
  )
}

export default App;