import AddCategoryModal from '../../src/components/AddCategoryModal'

describe('<AddCategoryModal/>', () => {
  const mockCategories = [
    { id: 1, name: 'Personligt', description: 'Test' },
    { id: 2, name: 'Arbete', description: 'Test' },
  ]

  beforeEach(() => {
    cy.mount(
      <AddCategoryModal
        categories={mockCategories}
        getCategories={cy.stub()}
        notes={[]}
      />
    )
  })

  it('verifies add-categori-icon is visible and modal is not visible', () => {
    cy.get('[data-cy=add-category-icon]').should('be.visible')
    cy.get('[data-cy=add-category-icon-text]')
      .should('be.visible')
      .and('contain', 'Hantera kategorier')
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
    cy.get('[data-cy=add-category-icon]').click()
    cy.get('[data-cy="badge-1"]').first().should('contain.text', 'Personligt')
    cy.get('[data-cy="badge-2"]').last().should('contain.text', 'Arbete')
  })
})
