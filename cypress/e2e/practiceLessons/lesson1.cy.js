describe('Practice Page Test', () => {
  it('should visit page and find text', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.contains('h1', 'Practice Page').should('be.visible')
  })
})