import { useState } from 'react'
import { Sticky } from 'react-bootstrap-icons'
import { Modal, Button, Form } from 'react-bootstrap'
import { Category } from '../../../shared/interfaces'

interface AddNoteModalProps {
  categories: Category[]
  getNotes: () => void
}

export default function AddNoteModal({
  categories,
  getNotes,
}: AddNoteModalProps) {
  const [modalVisible, setModalVisible] = useState(false),
    [title, setTitle] = useState(''),
    [content, setContent] = useState(''),
    [category, setCategory] = useState(''),
    [author, setAuthor] = useState('')

  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author,
        title,
        content,
        category,
      }),
    }
    try {
      const response = await fetch(
        'http://localhost:3000/api/add-note',
        requestOptions
      )
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error in POST request:', error)
    } finally {
      getNotes()
    }
  }

  return (
    <div className="d-flex flex-column">
      <Modal data-cy="add-note-modal" show={modalVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Skapa anteckning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="addNoteForm" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                data-cy="add-note-title"
                type="text"
                placeholder="Lägg till titel"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Anteckning</Form.Label>
              <Form.Control
                data-cy="add-note-note"
                as="textarea"
                placeholder="Lägg till anteckning"
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategories">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                data-cy="add-note-categories-dropdown"
                role="button"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Namn</Form.Label>
              <Form.Control
                data-cy="add-note-author"
                type="text"
                placeholder="Skriv ditt namn"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Stäng
          </Button>
          <Button
            data-cy="add-note-send-button"
            form="addNoteForm"
            variant="primary"
            type="submit"
            onClick={handleClose}
          >
            Lägg till
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="text-center mx-2"
        role="button"
        onClick={handleShow}
        data-cy="show-add-note-modal-button"
      >
        <Sticky size={52} />
        <span className="d-block mt-2">Skapa anteckning</span>
      </div>
    </div>
  )
}
