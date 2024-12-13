import AddCategoryModal from '../../src/components/AddCategoryModal'

describe('<AddCategoryModal/>', () => {
  const mockCategories = [
    { id: 1, name: 'Personligt', description: 'Test' },
    { id: 2, name: 'Arbete', description: 'Test' },
  ]

  beforeEach(() => {
    cy.mount(<AddCategoryModal categories={mockCategories} />)
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

  it('verifies first and last category in list contains right text', () => {
    cy.get('[data-cy=add-category-current-categories]')
      .first()
      .should('contain', 'Personligt')
    cy.get('[data-cy=add-category-current-categories]')
      .last()
      .should('contain', 'Arbete')
  })
})
