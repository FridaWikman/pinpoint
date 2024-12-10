import { Modal, Button } from 'react-bootstrap'
import { Note } from '../../../shared/interfaces'

interface DeleteModalProps {
  show: boolean
  onClose: () => void
  note: Note | null
  getNotes: () => void
}

export default function DeleteModal({
  show,
  onClose,
  note,
  getNotes,
}: DeleteModalProps) {
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
      onClose()
    }
  }

  return (
    <div>
      {note && (
        <Modal show={show} onHide={onClose}>
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
            <Button onClick={onClose} variant="secondary">
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
      )}
    </div>
  )
}
