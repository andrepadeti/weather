import React from 'react'

const Loading = ({message}) => {
  return (
    <div class='d-flex align-items-center'> 
      <div className=''>{message}</div> 
      <div
        class='spinner-border ms-auto'
        role='status'
        aria-hidden='true'
      ></div>
    </div>
  )
}

export default Loading