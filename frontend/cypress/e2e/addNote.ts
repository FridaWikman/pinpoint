import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor'

let initialLengthOfNotes: number

Before(() => {
  cy.visit('/')
  cy.get('[data-cy=notes-list-item]').then((items) => {
    initialLengthOfNotes = items.length
  })
})

Given('I am on the homepage and sees the button for add note', () => {
  cy.get('[data-cy=show-add-note-modal-button').should('be.visible')
})

Given('I am on the homepage and sees the note and trash-icon', () => {
  cy.get('[data-cy=notes-list-item]')
    .last()
    .should('contain', 'Test anteckning')
    .find('[data-cy=delete-note-icon]')
})

When(
  'I click on the button. I put values in all fields in the form. I click on send-button',
  () => {
    cy.get('[data-cy=show-add-note-modal-button]').click()
    cy.get('[data-cy=add-note-modal]').should('be.visible')
    cy.get('[data-cy=add-note-title]').type('Test anteckning')
    cy.get('[data-cy=add-note-note]').type('Förbered presentation till torsdag')
    cy.get('.form-select').select(1).should('contain', 'Arbete')
    cy.get('[data-cy=add-note-author]').type('Anna')
    cy.get('[data-cy=add-note-send-button]').click()
  }
)

When('I click on trash-icon. I click on delete button', () => {
  cy.get('[data-cy=notes-list-item]')
    .last()
    .should('contain', 'Test anteckning')
    .find('[data-cy=delete-note-icon]')
    .click()
  cy.get('[data-cy=delete-modal]').should('be.visible')
  cy.get('[data-cy=delete-modal-title]').should('have.text', 'Test anteckning')
  cy.get('[data-cy=delete-note-button]').click()
})

Then(
  'The modal should close and the list of notes should have increased by one',
  () => {
    cy.get('[data-cy=add-note-modal]').should('not.exist')
    cy.get('[data-cy=notes-list-item]').should(
      'have.length',
      initialLengthOfNotes + 1
    )
  }
)

Then('The modal should close and the note should not exist', () => {
  cy.get('[data-cy=delete-modal]').should('not.exist')
  cy.get('[data-cy=notes-list-item]')
    .last()
    .should('not.contain', 'Test anteckning')
  cy.get('[data-cy=notes-list-item]').should(
    'have.length',
    initialLengthOfNotes - 1
  )
})
