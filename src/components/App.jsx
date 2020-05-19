import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import List from './List.jsx';

const ListHeader = props => {
  const router = useRouter()
  return (
    <div className="list-header d-flex align-items-center justify-content-between">
      <span className="title">Personal transactions</span>
      <Button 
        variant="contained"
        color="primary"
        className="add-button"
        onClick={()=>router.push('/add')}
        >
        + ADD
      </Button>
    </div>
  )
}

const useTransactionsApi = () => {
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

  return [{ data, isLoading, isError, updateData }, setUpdateData]
}

const App = () => {

  const [{ data, isLoading, isError, updateData }, doUpdateData ] = useTransactionsApi()

  return (
    <div className="app">
      <ListHeader />
      <List
        data={data}
        loading={isLoading}
        error={isError}
        onUpdate={()=>doUpdateData(!updateData)}
      />
    </div>
  )
}

export default App;