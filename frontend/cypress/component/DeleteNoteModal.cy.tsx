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
    cy.get('[data-cy="delete-note-icon"]').should('be.visible')
    cy.get('[data-cy=delete-modal]').should('not.exist')
  })

  it('opens modal correctly', () => {
    cy.get('[data-cy="delete-note-icon"]').click()
    cy.get('[data-cy=delete-modal]').should('be.visible')
  })

  it('closes modal when cancel-button is clicked', () => {
    cy.get('[data-cy="delete-note-icon"]').click()
    cy.get('[data-cy=delete-modal-cancel]').click()
  })

  it('displays the correct note title in the modal', () => {
    cy.get('[data-cy="delete-note-icon"]').click()
    cy.get('[data-cy=delete-modal-title]').should('have.text', 'Test note')
  })
})
// import DeleteNoteModal from '../../src/components/DeleteNoteModal'

// describe('<DeleteNoteModal />', () => {
//   it('mounts DeleteNoteModal, click on trash-icon and click on "Ta bort"-button', () => {
//     const mockNote = {
//       author: 'Frida',
//       title: 'Köp mjölk',
//       content: 'Köp mer mjölk',
//       created: '',
//       updated: '',
//       categoryName: 'Personligt',
//       category: 1,
//       categoryDescription: 'Beskrivning',
//       id: 13,
//     }
//     const mockGetNote = cy.stub()

//     cy.mount(<DeleteNoteModal note={mockNote} getNotes={mockGetNote} />)
//     cy.get('[data-cy=delete-note-icon]').click()
//     cy.get('[data-cy=delete-modal-text]').should('contain', 'Köp mjölk')
//     cy.get('[data-cy=delete-note-button]').click()
//   })
// })
