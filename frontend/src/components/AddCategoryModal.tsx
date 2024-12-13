import { Tag } from 'react-bootstrap-icons'
import { Category } from '../../../shared/interfaces'
import { Modal, Form, Button, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface AddCategoryModalProps {
  categories: Category[]
  getCategories: () => void
}

export default function AddCategoryModal({
  categories,
  getCategories,
}: AddCategoryModalProps) {
  const [category, setCategory] = useState(''),
    [modalVisible, setModalVisible] = useState(false)

  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: category,
      }),
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/add-category',
        requestOptions
      )
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error in POST request:', error)
    } finally {
      getCategories()
      toast.success(<div>Kategori {category} har lagts till.</div>)
    }
  }

  return (
    <div>
      <Modal data-cy="category-modal" show={modalVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lägg till kategori</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Alla kategorier</p>
            {categories ? (
              categories.map((category) => (
                <Badge
                  data-cy={`badge-${category.id}`}
                  key={category.id}
                  className="mx-1"
                  bg="info"
                >
                  {category.name}
                </Badge>
              ))
            ) : (
              <p>Det finns inga kategorier än</p>
            )}
          </div>
          <Form className="mt-4" id="addCategoryForm" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Lägg till en kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategori"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-cy="add-category-cancel"
            variant="secondary"
            onClick={handleClose}
          >
            Stäng
          </Button>
          <Button
            form="addCategoryForm"
            variant="primary"
            type="submit"
            onClick={handleClose}
          >
            Lägg till
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="mx-2 text-center"
        role="button"
        onClick={handleShow}
        data-cy="add-category-icon"
      >
        <Tag size={52} />
        <span data-cy="add-category-icon-text" className="d-block mt-2">
          Lägg till kategori
        </span>
      </div>
    </div>
  )
}
