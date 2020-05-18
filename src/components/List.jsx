import React, { useState, useEffect } from 'react';

const ErrorMessage = props => {
  if(props.error) {
    return <div className="alert alert-danger" role="alert">
      It looks like something went wrong!
    </div>
  } else {
    return null
  }
}

const SpinnerLoading = props => {
  if(props.loading){
    return (
      <div className="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  } else {
    return null
  }
}

const List = props => {
  return (
    <div className="list">
      <ErrorMessage error={props.error} />
      <SpinnerLoading loading={props.loading} />
      List
    </div>
  )
}

export default List;