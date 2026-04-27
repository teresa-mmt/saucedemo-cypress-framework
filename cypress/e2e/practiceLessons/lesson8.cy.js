describe('Practice Asssertion', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should assert the h1 is existing and verify the title page', () => {
        cy.get('h1')
            .should('exist')
            .and('contain', 'Practice Page')
    })

    it('should verify if radio button exist and visible', () => {
        cy.get('#radio-btn-example')
            .should('exist')
            .and('be.visible')
    })
})