// import DeleteNoteModal from '../../src/components/DeleteNoteModal'

// describe('<DeleteNoteModal />', () => {
//   it('mounts DeleteNoteModal, click on close-button', () => {
//     cy.mount(<DeleteNoteModal note={} getNotes={} />)
//   })
// })

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
