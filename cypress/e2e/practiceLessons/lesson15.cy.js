describe('Practice DOM Traversal', ()=> {

    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should checkbox become checked', ()=> {
        cy.get('#checkbox-example')
        .find('input')
        .eq(2)
        .check()
    
        cy.get('#checkbox-example')
        .find('input')
        .eq(2)
        .should('be.checked')


    })
})