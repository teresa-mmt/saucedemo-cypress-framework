describe('Alert Test', () => {
    it('User triggers alert', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#name')
            .type('Teresa')

        cy.get('#alertbtn')
            .click()
    })
})