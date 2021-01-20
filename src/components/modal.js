import React from 'react'

const Modal = ({ handleDeleteFavourites }) => {
  return (
    <div className='modal fade' id='modalDeleteFavourites' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content text-dark bg-light'>
          <div className='modal-header'>
            <h5 className='modal-title'>Delete Favourites</h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete all your favourites?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleDeleteFavourites}
              data-bs-dismiss='modal'
            >
              Delete favourites
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
