describe('Automation Practice Inputs', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })


    it('test input field', () => {
        cy.get('#name')
            .type('Cypress Student')
    })

    it('test alert button', () => {
        cy.get('#alertbtn')
            .click()
    })
})