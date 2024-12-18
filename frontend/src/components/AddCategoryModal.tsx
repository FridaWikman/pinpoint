import { Tag } from 'react-bootstrap-icons'
import { Category, Note } from '../../../shared/interfaces'
import { Modal, Form, Button, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { X } from 'react-bootstrap-icons'

interface AddCategoryModalProps {
  categories: Category[]
  getCategories: () => void
  notes: Note[]
}

export default function AddCategoryModal({
  categories,
  getCategories,
  notes = [],
}: AddCategoryModalProps) {
  const [category, setCategory] = useState(''),
    [modalVisible, setModalVisible] = useState(false),
    [isInvalid, setIsInvalid] = useState(false)

  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCategory(value)
    const exists = categories.some((category) => category.name === value)
    if (exists) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }

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
      toast.success(<div>Kategori {category} har lagts till</div>)
      setCategory('')
    }
  }

  const deleteCategory = async (id: number, categoryName: string) => {
    const exists = notes.some((note) => note.categoryName === categoryName)
    if (exists) {
      toast.warning(
        <div>Denna kategori används i en anteckning och kan inte tas bort</div>
      )
    } else {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      }
      try {
        await fetch('http://localhost:3000/api/delete-category', requestOptions)
      } catch (error) {
        console.error('Error in DELETE request:', error)
      } finally {
        getCategories()
      }
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
                  data-cy="badge"
                  key={category.id}
                  className="mx-1"
                  bg="info"
                >
                  {category.name}{' '}
                  <span
                    data-cy="delete-category"
                    role="button"
                    onClick={() => deleteCategory(category.id, category.name)}
                  >
                    <X />
                  </span>
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
                data-cy="add-category-input"
                type="text"
                placeholder="Kategori"
                value={category}
                onChange={handleCategoryChange}
                isInvalid={isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                Kategorin finns redan
              </Form.Control.Feedback>
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
            data-cy="add-category-submit"
            form="addCategoryForm"
            variant="primary"
            type="submit"
            onClick={handleClose}
            disabled={isInvalid}
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
        <Tag size={40} />
        <span data-cy="add-category-icon-text" className="d-block mt-2">
          Hantera kategorier
        </span>
      </div>
    </div>
  )
}
