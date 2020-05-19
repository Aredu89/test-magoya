import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import Form from './Form.jsx'

const AddHeader = props => {
  const router = useRouter()
  return (
    <div className="add-header d-flex align-items-center justify-content-between">
      <span className="title">Add transaction</span>
      <div>
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
      </div>
      
    </div>
  )
}

const Add = () => {
  const handleSave = () => {

  }
  return (
    <div className="add">
      <AddHeader 
        onSave={handleSave}
      />
      <Form />
    </div>
  )
}

export default Add;