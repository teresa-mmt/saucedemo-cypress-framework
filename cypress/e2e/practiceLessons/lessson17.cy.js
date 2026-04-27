describe('Practice Aliases', ()=>{
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        cy.get('#checkbox-example')
        .find('input[type="checkbox"]')
        .eq(1)
        .as('option2')
    })

    it('should checkbox become checked', ()=>{
        cy.get('@option2')
        .should('be.visible')
        .check()
        .should('be.checked')
    })
})