describe('Practice API testing', () => {


    it('should have status of 200 and returnss list of users', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
            .then((response) => {

                expect(response.status).to.eq(200)
                expect(response.body.length).to.be.greaterThan(0)

                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('name')

            })
    })

})