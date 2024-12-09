import NoteBoard from '../../src/components/NoteBoard'

describe('<NoteBoard />', () => {
  it('mounts NoteBoard and verifies that notes from database is visible', () => {
    cy.mount(<NoteBoard />)
    cy.get('[data-cy=notes-list-item]').should('have.length.greaterThan', 0)
    cy.get('[data-cy=note-card-content]').should('not.be.empty')
  })
})
