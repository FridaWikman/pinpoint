import {
  When,
  Then,
  Given,
  Before,
} from '@badeball/cypress-cucumber-preprocessor'

let initialLengthOfNotes: number

Before(() => {
  cy.visit('http://localhost:5173/')
})

Given('I am on the homepage and sees the button for add note', () => {
  cy.get('[data-cy=show-add-note-modal-button').should('be.visible')
  cy.get('[data-cy=notes-list] .notes-list-item').then((items) => {
    initialLengthOfNotes = items.length
  })
})

Given('I see the modal an the form', () => {
  cy.get('[data-cy=add-note-modal]').should('be-visable')
  cy.get('data-cy=add-note-form').should('be.visible')
})

When('I click on the button', () => {
  cy.get('[data-cy=show-add-note-modal-button]').click()
})

When('I put values in all fields in the form. I click on send-button', () => {
  cy.get('[data-cy=add-note-title]').type('Till Kalle')
  cy.get('[data-cy=add-note-note]').type(
    'Glöm inte att vi ska hem till dina föräldrar i eftermiddag. Du behöver köpa en present.'
  )
  cy.get('[data-cy=add-note-categories]').select('Personligt')
  cy.get('[data-cy=add-note-author]').type('Anna')
  cy.get('[data-cy=add-note-send-button]').click()
})

Then('The modal should be visible', () => {
  cy.get('[data-cy=add-note-modal]').should('be.visible')
})

Then(
  'The modal should close and the list of notes should have increased by one',
  () => {
    cy.get('[data-cy=add-note-modal]').should('not.exist')
    cy.get('[data-cy=notes-list] .notes-list-item').should(
      'have.length',
      initialLengthOfNotes + 1
    )
  }
)
