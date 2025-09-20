describe('Pizza Order App - IT1 Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should navigate to order page and input text in name field', () => {
    // Homepage'den order sayfasına git
    cy.get('.order-btn').contains('ACIKTIM').click()
    cy.url().should('include', '/siparis')
    
    // İsim inputuna metin gir
    cy.get('input[name="isim"]').type('Test Kullanıcısı')
    cy.get('input[name="isim"]').should('have.value', 'Test Kullanıcısı')
  })

  it('should select multiple ingredients', () => {
    // Order sayfasına git
    cy.get('.order-btn').click()
    
    // Birden fazla malzeme seç
    cy.get('input[type="checkbox"]').first().check()
    cy.get('input[type="checkbox"]').eq(1).check()
    cy.get('input[type="checkbox"]').eq(2).check()
    cy.get('input[type="checkbox"]').eq(3).check()
    cy.get('input[type="checkbox"]').eq(4).check()
    
    // Seçilen malzemelerin işaretli olduğunu kontrol et
    cy.get('input[type="checkbox"]:checked').should('have.length.at.least', 4)
  })

  it('should submit form successfully with valid data', () => {
    // Order sayfasına git
    cy.get('.order-btn').click()
    
    // Formu doldur
    cy.get('input[name="isim"]').type('Test User')
    
    // Pizza boyutu seç
    cy.get('input[type="radio"][value="Küçük"]').check()
    
    // Hamur seç
    cy.get('select[name="hamur"]').select('normal')
    
    // En az 4 malzeme seç
    cy.get('input[type="checkbox"]').eq(0).check() // Pepperoni
    cy.get('input[type="checkbox"]').eq(1).check() // Domates
    cy.get('input[type="checkbox"]').eq(2).check() // Biber
    cy.get('input[type="checkbox"]').eq(3).check() // Sosis
    
    // Not ekle
    cy.get('textarea[name="ozelNotlar"]').type('Test siparişi')
    
    // Submit butonunun aktif olduğunu kontrol et
    cy.get('.submit-btn').should('not.have.class', 'disabled')
    
    // Formu gönder
    cy.get('.submit-btn').click()
    
    // Success sayfasına yönlendirildiğini kontrol et
    cy.url().should('include', '/onay')
  })

  it('should disable submit button with invalid form data', () => {
    cy.get('.order-btn').click()
    
    // Yetersiz veri ile butonun disabled olduğunu test et
    cy.get('input[name="isim"]').type('ab') // 2 karakter - geçersiz
    cy.get('.submit-btn').should('have.class', 'disabled')
    
    // Geçerli isim ekle
    cy.get('input[name="isim"]').clear().type('Test User')
    
    // Boyut seç ama malzeme seçme
    cy.get('input[type="radio"][value="Küçük"]').check()
    cy.get('.submit-btn').should('have.class', 'disabled')
    
    // Sadece 2 malzeme seç (minimum 4 gerekli)
    cy.get('input[type="checkbox"]').eq(0).check()
    cy.get('input[type="checkbox"]').eq(1).check()
    cy.get('.submit-btn').should('have.class', 'disabled')
  })
})