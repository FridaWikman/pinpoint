import { useEffect, useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Note } from '../../../shared/interfaces'
import { PencilSquare } from 'react-bootstrap-icons'
import '../index.css'
import AddNoteModal from './AddNoteModal'
import DeleteNoteModal from './DeleteNoteModal'

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([])

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
          {notes && notes.length > 0 ? (
            notes.map((note) => (
              <Card
                key={note.id}
                className="noteCard"
                data-cy="notes-list-item"
              >
                <Card.Header className="d-flex justify-content-between">
                  <Badge bg="info">{note.categoryName}</Badge>
                  <span className="d-flex align-items-center">
                    <PencilSquare role="button" />
                    <DeleteNoteModal
                      noteId={note.id}
                      noteTitle={note.title}
                      getNotes={getNotes}
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
            <h2 data-cy="empty-list-messege">
              Din anslagstavla är tom. Klicka på plus för att lägga till en ny.
            </h2>
          )}
        </div>
      </div>

      <AddNoteModal getNotes={getNotes} />
    </div>
  )
}
