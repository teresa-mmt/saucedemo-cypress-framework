describe('Practice Assertions expect and assert', () => {
    beforeEach(()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should validate the text includes Practice', ()=>{
        cy.get('h1')
        .then(($el)=>{
            const title = $el.text()
            expect(title).to.include('Practice')
        })
    })
})