import React, { useState, useEffect } from 'react';
import ReactBootstrapTable from 'react-bootstrap-table-next';
import Button from '@material-ui/core/Button';

const ErrorMessage = props => {
  if(props.error) {
    return <div className="alert alert-danger" role="alert">
      It looks like something went wrong!
    </div>
  } else {
    return null
  }
}

const SpinnerLoading = () => {
  return (
    <div className="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}

const UpdateButton = props => {
  return (
    <Button
      onClick={props.onClick}
      className="update-button"
    >Update List</Button>
  )
}

const BootstrapTable = (props) => {
  const columns = [{
    dataField: 'date',
    text: 'Date',
    sort: true
  }, {
    dataField: 'description',
    text: 'Description',
    sort: true
  }, {
    dataField: 'amount',
    text: 'Amount',
    sort: true
  }, {
    dataField: '',
    text: 'Actions',
    sort: false,
  }, {
    dataField: 'id',
    text: 'id',
    sort: true,
    hidden: true
  }];

  const defaultSorted = [{
    dataField: 'date',
    order: 'desc'
  }];

  return (
    <>
      <UpdateButton onClick={props.onUpdate} />
      { props.loading ? (
        <SpinnerLoading />
      ) : (
        <ReactBootstrapTable
          bootstrap4
          keyField="id"
          data={ props.data }
          columns={ columns }
          defaultSorted={ defaultSorted } 
        />
      )}
    </>
  )
}

const List = props => {
  return (
    <div className="list">
      <ErrorMessage error={props.error} />
      <BootstrapTable data={props.data} loading={props.loading} />
    </div>
  )
}

export default List;