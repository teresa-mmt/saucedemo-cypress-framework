describe('Practice invoke() and then()', () => {
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should extract the header text and verify it', ()=>{
        cy.get('h1')
        .invoke('text')
        .should('equal', 'Practice Page')
    })
})