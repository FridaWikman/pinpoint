import NoteBoard from '../../src/components/NoteBoard'

describe('<NoteBoard />', () => {
  it('mounts NoteBoard and verifies that notes from database is visible', () => {
    cy.mount(<NoteBoard />)

    cy.get('[data-cy=notes-list-item]').should('have.length.greaterThan', 0)
    cy.get('[data-cy=note-card-content]').should('not.be.empty')
  })

  it('verifies right element is visible when list is empty', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/notes',
      },
      {
        body: [],
      }
    ).as('emptyNoteList')
    cy.mount(<NoteBoard />)

    cy.wait('@emptyNoteList')
    cy.get('[data-cy=empty-list-messege]')
      .should('be.visible')
      .and(
        'contain',
        'Din anslagstavla är tom. Klicka på plus för att lägga till en ny.'
      )
  })
})
