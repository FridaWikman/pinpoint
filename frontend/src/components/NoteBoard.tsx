import { useEffect, useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Note, Category } from '../../../shared/interfaces'
import { PencilSquare } from 'react-bootstrap-icons'
import '../index.css'
import AddNoteModal from './AddNoteModal'
import DeleteNoteModal from './DeleteNoteModal'
import AddCategoryModal from './AddCategoryModal'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([]),
    [categories, setCategories] = useState<Category[]>([]),
    [modalVisible, setModalVisible] = useState(false),
    [noteToEdit, setNoteToEdit] = useState<Note | null>(null)

  const toggleModalVisible = () => setModalVisible(true)

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes')
      const result: [] = await response.json()
      setNotes(result)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories')
      const result: [] = await response.json()
      setCategories(result)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  useEffect(() => {
    getNotes()
    getCategories()
  }, [])

  const convertDate = (dateToConvert: string): string => {
    const date = new Date(dateToConvert)
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    return date.toLocaleDateString('sv-SE', options)
  }

  return (
    <div className="d-flex flex-column min-vh-100 ">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="mt-5 bigContainer justify-content-center">
        <div id="testContainer" className="d-flex flex-wrap">
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
                    <PencilSquare
                      data-cy="edit-note-button"
                      role="button"
                      onClick={() => {
                        setNoteToEdit(note)
                        toggleModalVisible()
                      }}
                    />
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
            <h2 data-cy="empty-list-messege">Din anslagstavla är tom.</h2>
          )}
        </div>
      </div>
      <div className="d-flex position-fixed bottom-0 start-50 translate-middle-x mb-5">
        <AddNoteModal
          categories={categories}
          getNotes={getNotes}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
        />

        <AddCategoryModal
          categories={categories}
          getCategories={getCategories}
          notes={notes}
        />
      </div>
    </div>
  )
}
