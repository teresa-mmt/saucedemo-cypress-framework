describe('Practice Interaction', () => {

    it('should perform interactions', () => {

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#name')
            .type('QA Tester')

        cy.get('#checkBoxOption2')
            .check()

        cy.get('#dropdown-class-example')
            .select('Option3')

        cy.get('#opentab')
            .click()

    })


})