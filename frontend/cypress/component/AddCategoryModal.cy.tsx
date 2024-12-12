import AddCategoryModal from '../../src/components/AddCategoryModal'

describe('<AddCategoryModal/>', () => {
  beforeEach(() => {
    cy.mount(<AddCategoryModal categories={'Personligt'} />)
  })

  it('verifies add-categori-icon is visible and modal is not visible', () => {
    cy.get('[data-cy=add-category-icon]').should('be.visible')
    cy.get('[data-cy=add-category-icon-test]')
      .should('be.visible')
      .and('contain', 'Lägg till kategori')
    cy.get('[data-cy=category-modal]').should('not.exist')
  })

  it('opens modal correctly', () => {
    cy.get('[data-cy=add-category-icon]').click()
    cy.get('[data-cy=category-modal]').should('be.visible')
  })

  it('closes modal when cancel-button is clicked', () => {
    cy.get('[data-cy=add-category-icon]').click()
    cy.get('[data-cy=add-category-cancel]').click()
  })
})
