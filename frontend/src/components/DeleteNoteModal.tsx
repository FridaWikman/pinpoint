import { Modal, Button } from 'react-bootstrap'
import { Trash3 } from 'react-bootstrap-icons'
import { useState } from 'react'

interface DeleteModalProps {
  noteId: number
  noteTitle: string | null
  getNotes: () => void
}

export default function DeleteNoteModal({
  noteId,
  noteTitle,
  getNotes,
}: DeleteModalProps) {
  const [modalVisible, setModalVisible] = useState(false)

  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)

  const deleteNote = async (id: number) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }
    try {
      await fetch('http://localhost:3000/api/delete-note', requestOptions)
    } catch (error) {
      console.error('Error in DELETE request:', error)
    } finally {
      getNotes()
    }
  }

  return (
    <>
      <div>
        <Modal data-cy="delete-modal" show={modalVisible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ta bort antecking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Vill du ta bort antecking{' '}
              <span data-cy="delete-modal-title" className="fst-italic">
                {noteTitle}
              </span>
              ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              data-cy="delete-modal-cancel"
              onClick={handleClose}
              variant="secondary"
            >
              Avbryt
            </Button>
            <Button
              data-cy="delete-note-button"
              onClick={() => {
                deleteNote(noteId)
              }}
              variant="danger"
            >
              Ta bort
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Trash3
        data-cy="delete-note-icon"
        className="ms-1"
        role="button"
        onClick={handleShow}
      />
    </>
  )
}
