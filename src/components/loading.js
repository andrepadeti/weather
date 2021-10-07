import * as React from 'react'

const Loading = ({ message }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className=''>{message}</div>
      <div
        className='spinner-border ms-auto'
        role='status'
        aria-hidden='true'
      ></div>
    </div>
  )
}

export default Loading
