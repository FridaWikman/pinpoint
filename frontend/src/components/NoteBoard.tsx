import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import { Note } from '../../../shared/interfaces'
import { Trash3, PencilSquare } from 'react-bootstrap-icons'

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([])

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes')
      const result = await response.json()
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
      // weekday: 'short',
    }
    return date.toLocaleDateString('sv-SE', options)
  }
  return (
    <Container className="mt-5" fluid>
      <Row xs="auto">
        {notes ? (
          notes.map((note) => (
            <Col key={note.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Header className="d-flex justify-content-between">
                  {convertDate(note.created)}{' '}
                  <Badge bg="info">{note.categoryName}</Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {note.author}
                  </Card.Subtitle>
                  <Card.Text>{note.content}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <PencilSquare role="button" />
                  <Trash3 className="ms-1" role="button" />
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>Lägg till en anteckning</p>
        )}
      </Row>
    </Container>
  )
}
