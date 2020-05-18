import React, { useState, useEffect } from 'react';
import List from './List.jsx'

const ListHeader = props => {
  return (
    <div className="list-header d-flex align-items-center">
      <span className="title">Personal transactions</span>
    </div>
  )
}

const App = () => {

  const [data, setData] = useState([])
  const [updateData, setUpdateData] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() =>{
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      const options = {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      }
      try{
        const response = await fetch('/api/transactions', options)
        const result = await response.json()

        setData(result)
      } catch {
        setIsError(true)
      }
        
      setIsLoading(false)
    }
    fetchData()
  },[
    updateData
  ])

  return (
    <div className="app">
      <ListHeader />
      <List
        data={data}
        loading={isLoading}
        error={isError}
      />
    </div>
  )
}

export default App;