describe('Search Test', () => {

    it('Search Cypress', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#autocomplete')
            .type('Japan')

    })
})