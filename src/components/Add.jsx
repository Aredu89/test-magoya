import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Form from './Form.jsx';
import Swal from 'sweetalert2';

const SpinnerLoading = () => {
  return (
    <div className="save-pending">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

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
        {props.pending &&
          <SpinnerLoading />
        }
      </div>
      
    </div>
  )
}

const Add = () => {
  const router = useRouter()

  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('')
  const [savePending, setSavePending] = useState(false)

  const handleSave = async () => {
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.error,
        })
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'Your new transaction has been saved',
        }).then(()=>{
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
        description={{description, setDescription}}
      />
    </div>
  )
}

export default Add;