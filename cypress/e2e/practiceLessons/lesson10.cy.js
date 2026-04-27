describe('Practice Text&Value Assertion',  () =>  {
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should  store the typed value inside  the input field',  ()=> {
        cy.get('#name')
        .type('QA Engineer')
        .should('have.value', 'QA Engineer')
    })
})