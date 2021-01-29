import React from 'react'
import Modal from 'react-bootstrap/Modal'

export const DeleteFavouritesModal = ({
  handleDeleteFavourites,
  showModal,
  setShowModal,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className='text-dark'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='modal-title'>Delete Favourites</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete all your favourites?</p>
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setShowModal(false)}
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
      </Modal.Footer>
    </Modal>
  )
}

export const GeolocationModal = ({ showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Geolocation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please, allow location access so that next time I can show the weather
        forecast for your current location.
      </Modal.Body>
      <Modal.Footer>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setShowModal(false)} 
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}
