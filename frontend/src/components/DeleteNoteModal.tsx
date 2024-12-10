import { Modal, Button } from 'react-bootstrap'
import { Note } from '../../../shared/interfaces'
import { Trash3 } from 'react-bootstrap-icons'
import { useState } from 'react'

interface DeleteModalProps {
  note: Note
  getNotes: () => void
}

export default function DeleteModal({ note, getNotes }: DeleteModalProps) {
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
        <Modal show={modalVisible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ta bort antecking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Vill du ta bort antecking{' '}
              <span className="fst-italic">{note.title}</span>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary">
              Stäng
            </Button>
            <Button
              onClick={() => {
                deleteNote(note.id)
              }}
              variant="danger"
            >
              Ta bort
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Trash3 className="ms-1" role="button" onClick={handleShow} />
    </>
  )
}
