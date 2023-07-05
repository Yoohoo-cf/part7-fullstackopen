describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'Janie',
      username: 'another',
      password: 'password'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it(' a new blog can be created', function(){
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Jamie')
      cy.get('#url').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
    })

    describe('several blogs exist', function() {
      beforeEach(function(){
        cy.createBlog({ title: 'first blog', author: 'one', url: 'http://test1.com' })
        cy.createBlog({ title: 'second blog', author: 'two', url: 'http://test2.com' })
        cy.createBlog({ title: 'third blog', author: 'three', url: 'http://test3.com' })
      })

      it('one of those can be liked', function(){
        cy.contains('second blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('#like').click()

        cy.contains('1')
      })

      it('the blog can be deleted', function(){
        cy.contains('second blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'second blog')
      })

      it('a non creator can not delete the blog', function(){
        cy.contains('logout').click()
        cy.login({ username: 'another', password: 'password' })
        cy.contains('first blog').parent().find('button').as('firstButton')
        cy.get('@firstButton').click()
        cy.contains('remove').click()

        cy.contains('first blog')
      })
    })

    describe('blogs order', function(){

      beforeEach(function(){
        cy.login({ username: 'mluukkai', password: 'salainen' })
        cy.createBlog({ title: 'first blog', author: 'one', url: 'http://test1.com' })
        cy.createBlog({ title: 'second blog', author: 'two', url: 'http://test2.com' })
        cy.createBlog({ title: 'third blog', author: 'three', url: 'http://test3.com' })
      })


      it.only('the blogs are ordered according to likes', function(){
        cy.contains('third blog').contains('view').click()

        cy.get('#like').click()
        cy.get('#like').click()
        cy.get('#like').click()
        cy.reload()

        cy.get('.blog').then((blogs) => {
          expect(blogs.eq(0)).to.contain('third blog')
        })
      })
    })
  })
})