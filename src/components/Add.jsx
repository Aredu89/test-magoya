import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Form from './Form.jsx';
import Swal from 'sweetalert2';

//Spinner
const SpinnerLoading = () => {
  return (
    <div className="save-pending">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

//Header with title, cancel and save buttons
const AddHeader = props => {
  const router = useRouter()
  return (
    <div className="add-header d-flex align-items-center justify-content-between">
      <span className="title">Add transaction</span>
      <div className="d-flex align-items-center">
        <Button
          variant="contained"
          color="secondary"
          className="cancel-button"
          onClick={()=>router.back()}
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          color="primary"
          className="save-button"
          onClick={()=>props.onSave()}
          >
          SAVE
        </Button>
        {/* Spinner */}
        {props.pending &&
          <SpinnerLoading />
        }
      </div>
      
    </div>
  )
}

const Add = () => {
  const router = useRouter()

  //State
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(null)
  const [amountError, setAmountError] = useState(false)
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState(false)
  const [savePending, setSavePending] = useState(false)

  //Save the transaction
  const handleSave = async () => {
    //Error control
    if(amount === 0 || !amount){
      setAmountError(true)
      if(!description){
        setDescriptionError(true)
      }
      return
    }
    if(!description){
      setDescriptionError(true)
      return
    }
    //If we don´t have error, we try to save
    setSavePending(true)
    const body = {
      amount,
      date,
      description,
    }
    const options = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    try{
      const response = await fetch('/api/transactions', options)
      const result = await response.json()

      if(result.error){
        //We show the error in an alert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.error,
        })
      } else {
        //Success alert
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'Your new transaction has been saved',
        }).then(()=>{
          //We go back to the list
          router.push('/')
        })
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Server error',
      })
    }
      
    setSavePending(false)
  }

  return (
    <div className="add">
      <AddHeader 
        onSave={handleSave}
        pending={savePending}
      />
      <Form
        date={{date, setDate}}
        amount={{amount, setAmount}}
        amountError={{amountError, setAmountError}}
        description={{description, setDescription}}
        descriptionError={{descriptionError, setDescriptionError}}
      />
    </div>
  )
}

export default Add;