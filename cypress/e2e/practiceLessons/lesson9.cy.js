describe('Practice Assertion', () => {

  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
  })

  it('should check option 3 checkbox successfully', () => {
    cy.get('#checkBoxOption3').check()
    .should('be.visible')
    .should('be.checked')
  })


  it('should uncheck option 3 checkbox successfully', () => {
    cy.get('#checkBoxOption3').check()
    .should('be.checked')
    .uncheck()
    .should('not.be.checked')
  })


})