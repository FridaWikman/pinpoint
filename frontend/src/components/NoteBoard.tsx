import { useEffect, useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Note } from '../../../shared/interfaces'
import { Trash3, PencilSquare } from 'react-bootstrap-icons'
import '../index.css'
import AddNoteModal from './AddNoteModal'
import DeleteModal from './DeleteNote'

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([]),
    [showModal, setShowModal] = useState(false),
    [note, setNote] = useState<Note | null>(null)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes')
      const result: [] = await response.json()
      setNotes(result)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  const convertDate = (dateToConvert: string): string => {
    const date = new Date(dateToConvert)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'numeric',
      year: 'numeric',
    }
    return date.toLocaleDateString('sv-SE', options)
  }
  return (
    <div className="d-flex flex-column min-vh-100 ">
      <div className="mt-5 bigContainer justify-content-center">
        <div
          id="testContainer"
          className="d-flex flex-wrap"
          style={{ maxWidth: '80%' }}
        >
          {notes ? (
            notes.map((note) => (
              <Card
                key={note.id}
                className="noteCard"
                data-cy="notes-list-item"
              >
                <Card.Header className="d-flex justify-content-between">
                  <Badge bg="info">{note.categoryName}</Badge>
                  <span>
                    <PencilSquare role="button" />
                    <Trash3
                      className="ms-1"
                      role="button"
                      onClick={() => {
                        setNote(note)
                        handleOpenModal()
                      }}
                    />
                  </span>
                </Card.Header>

                <Card.Body className="pb-0 d-flex flex-column">
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text data-cy="note-card-content" className="mb-2">
                    {note.content}
                  </Card.Text>
                  <Card.Text className="mt-auto mb-1 text-muted d-flex justify-content-between">
                    {note.author ? (
                      <span>{note.author}</span>
                    ) : (
                      <span>Anonym</span>
                    )}

                    {convertDate(note.created)}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Lägg till en anteckning</p>
          )}
        </div>
      </div>
      <DeleteModal
        show={showModal}
        onClose={handleCloseModal}
        note={note}
        getNotes={getNotes}
      />

      <AddNoteModal getNotes={getNotes} />
    </div>
  )
}
