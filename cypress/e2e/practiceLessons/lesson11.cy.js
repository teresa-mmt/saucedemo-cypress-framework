describe('Practice attribute and count of elements', () => {
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should count checkbox options', ()=>{
        cy.get('#checkbox-example')
        .find('input[type="checkbox"]')
        .should('have.length', 3)
    })
})