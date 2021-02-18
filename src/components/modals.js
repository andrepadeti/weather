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
      <Modal.Body>
        <Modal.Title className='modal-title mb-3'>Delete Favourites</Modal.Title>
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

export class GeolocationModal extends React.Component {
  // TODO: can't focus on button
  constructor(props) {
    super(props)
    this.refButton = null
    this.setRefButton = e => {
      this.refButton = e
    }
    this.focusButton = () => {
      if (this.refButton) {
        this.refButton.focus()
      }
    }
  }

  componentDidMount() {
    this.focusButton()
  }

  render() {
    return (
      <Modal
        show={this.props.showModal}
        centered
        onHide={() => this.props.setShowModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Geolocation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please, allow location access so that next time I can show the weather
          forecast for your current location.
        </Modal.Body>
        <Modal.Footer>
          <button
            ref={this.setRefButton}
            type='button'
            className='btn btn-secondary'
            onClick={() => this.props.setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}
