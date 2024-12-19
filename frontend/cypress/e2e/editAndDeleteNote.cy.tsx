describe('edit note', () => {
  it('posts note', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/add-note',
      body: {
        author: 'Test namn',
        title: 'Test titel',
        content: 'Test anteckning',
        category: '1',
      },
    }).then((resp) => {
      expect(resp.status).to.eq(201)
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('finds the new note, clicks on edit-icon, verifies right values exists in form, changes some values, click on submit and verifies the new values is visible in the note. Clicks on submit', () => {
    cy.wait(500)
    cy.get('[data-cy=notes-list-item]')
      .last()
      .should('contain', 'Test')
      .find('[data-cy=edit-note-button]')
      .click()
    cy.get('[data-cy=add-note-modal]').should('be.visible')
    cy.get('[data-cy=modal-title]').should('contain', 'Redigera anteckning')
    cy.get('[data-cy=add-note-title]')
      .should('have.value', 'Test titel')
      .clear()
    cy.get('[data-cy=add-note-title]').type('Ny titel')
    cy.get('[data-cy=add-note-title]').should('have.value', 'Ny titel')
    cy.get('[data-cy=add-note-note]')
      .should('have.value', 'Test anteckning')
      .clear()
    cy.get('[data-cy=add-note-note]').type('Ny anteckning')
    cy.get('[data-cy=add-note-note]').should('have.value', 'Ny anteckning')
    cy.get('[data-cy=add-note-categories-dropdown]')
      .should('have.value', '1')
      .and('contain', 'Personligt')
    cy.get('[data-cy=add-note-author]').should('have.value', 'Test namn')
    cy.get('[data-cy=add-note-send-button]').should('contain', 'Ändra').click()
    cy.wait(500)
    cy.get('[data-cy=notes-list-item]')
      .last()
      .should('contain', 'Ny titel')
      .and('contain', 'Ny anteckning')
    cy.get('[data-cy=notes-list-item]')
      .last()
      .should('contain', 'Ny titel')
      .find('[data-cy=delete-note-icon]')
      .click()
    cy.get('[data-cy=delete-modal]').should('be.visible')
    cy.get('[data-cy=delete-modal-title]').should('have.text', 'Ny titel')
    cy.get('[data-cy=delete-note-button]').click()
    cy.wait(500)
    cy.get('[data-cy=notes-list-item]')
      .last()
      .should('not.contain', 'Ny titel')
      .and('not.contain', 'Ny anteckning')
  })
})
// Comment for testing GitHub actions
