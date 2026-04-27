describe('Practice Fixtures', ()=> {

    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.fixture('country').as('countryData')
    })


    it('should input field contain the typed country value', ()=>{

        cy.get('@countryData').then((data) => {
            cy.get('#autocomplete')
            .type(data.country)
            .should('have.value', data.country)

        })
    })
})