import DeleteNoteModal from '../../src/components/DeleteNoteModal'

describe('<DeleteNoteModal/>', () => {
  beforeEach(() => {
    cy.mount(
      <DeleteNoteModal
        noteId={1}
        noteTitle={'Test note'}
        getNotes={cy.stub()}
      />
    )
  })

  it('renders correctly with the trash icon and modal is not visible', () => {
    cy.get('[data-cy=delete-note-icon]').should('be.visible')
    cy.get('[data-cy=delete-modal]').should('not.exist')
  })

  it('opens modal correctly', () => {
    cy.get('[data-cy=delete-note-icon]').click()
    cy.get('[data-cy=delete-modal]').should('be.visible')
  })

  it('closes modal when cancel-button is clicked', () => {
    cy.get('[data-cy=delete-note-icon]').click()
    cy.get('[data-cy=delete-modal-cancel]').click()
  })

  it('displays the correct note title in the modal', () => {
    cy.get('[data-cy=delete-note-icon]').click()
    cy.get('[data-cy=delete-modal-title]').should('have.text', 'Test note')
  })
})
