import * as React from 'react'

const Title = ({ children, title, className }) => {
  return (
    <header
      className={`d-flex flex-column align-items-center fs-7 ${className}`}
    >
      <h3 className='fw-light'>{title}</h3>
      {children}
    </header>
  )
}

export default Title
