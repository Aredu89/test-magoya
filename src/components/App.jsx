import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import List from './List.jsx';
import Swal from 'sweetalert2';

// Header with title and ADD button
const ListHeader = () => {
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

//Custom Hook to fetch the data
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

        //We handle error response
        if(result.error){
          setIsError(true)
        } else {
          setData(result)
        }
      } catch {
        setIsError(true)
      }
        
      setIsLoading(false)
    }
    fetchData()
  },[
    updateData //If this changes we fetch the data again
  ])

  return [{ data, isLoading, isError, updateData }, setUpdateData]
}

const App = () => {
  // Calling the custom hook that fetches the data in every render
  const [{ data, isLoading, isError, updateData }, doUpdateData ] = useTransactionsApi()

  // Function for deleting a transaction
  const onDelete = id => {
    //First we ask if the user is sure to delete the transaction
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      //if the user confirm, we call the delete end point of the API
      if (result.value) {
        const deleteTransaction = async () => {
          const options = {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            }
          }
          try{
            const response = await fetch(`/api/transactions/${id}`, options)
            
            //We show a success alert if we deleted the transaction
            if(response.ok){
              Swal.fire(
                'Deleted!',
                'Your transaction has been deleted.',
                'success'
              ).then(()=>{
                //Updating the list
                doUpdateData(!updateData)
              })
            } else {
              //We show an alert for error response
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: result.error,
              })
            }
          } catch {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Server Error when deleting',
            })
          }
        }
        deleteTransaction()
      }
    })
  }

  return (
    <div className="app">
      <ListHeader />
      <List
        data={data}
        loading={isLoading}
        error={isError}
        onUpdate={()=>doUpdateData(!updateData)}
        onDelete={onDelete}
      />
    </div>
  )
}

export default App;