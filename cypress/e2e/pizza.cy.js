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
    
    // Malzemeleri seç
    cy.contains('Pepperoni').click()
    cy.contains('Domates').click()
    cy.contains('Biber').click()
    cy.contains('Sosis').click()
    cy.contains('Mısır').click()
    
    // Seçilen malzemelerin input'larının işaretli olduğunu kontrol et
    cy.contains('Pepperoni').parent().find('input[type="checkbox"]').should('be.checked')
    cy.contains('Domates').parent().find('input[type="checkbox"]').should('be.checked')
    cy.contains('Biber').parent().find('input[type="checkbox"]').should('be.checked')
    cy.contains('Sosis').parent().find('input[type="checkbox"]').should('be.checked')
    cy.contains('Mısır').parent().find('input[type="checkbox"]').should('be.checked')
  })

  it('should submit form successfully with valid data', () => {
    // Order sayfasına git
    cy.get('.order-btn').click()
    
    // Formu doldur
    cy.get('input[name="isim"]').type('Test User')
    
    // ÇÖZÜM: Radio button için label'a tıkla
    cy.contains('S').click()
    
    // Hamur seç
    cy.get('select[name="hamur"]').select('normal')
    
    // En az 4 malzeme seç - label'lara tıkla
    cy.contains('Pepperoni').click()
    cy.contains('Domates').click()
    cy.contains('Biber').click()
    cy.contains('Sosis').click()
    
    // Not ekle
    cy.get('textarea[name="ozelNotlar"]').type('Test siparişi')
    
    // Formu gönder
    cy.get('.submit-btn').click({force: true})
    
    
  })

  it('should disable submit button with invalid form data', () => {
    cy.get('.order-btn').click()
    
    // Yetersiz veri ile butonun disabled olduğunu test et
    cy.get('input[name="isim"]').type('ab') // 2 karakter - geçersiz
    
    // ÇÖZÜM: Class kontrolü daha spesifik yap
    cy.get('button.submit-btn').should('have.class', 'disabled')
    
    // Geçerli isim ekle
    cy.get('input[name="isim"]').clear().type('Test User')
    
    // Boyut seç - label'a tıkla
    cy.contains('S').click()
    
    // Buton hala disabled olmalı (malzeme eksik)
    cy.get('button.submit-btn').should('have.class', 'disabled')
    
    // Sadece 2 malzeme seç (minimum 4 gerekli)
    cy.contains('Pepperoni').click()
    cy.contains('Domates').click()
    
    // Hala disabled olmalı
    cy.get('button.submit-btn').should('have.class', 'disabled')
    
    // 2 malzeme daha ekle
    cy.contains('Biber').click()
    cy.contains('Sosis').click()
    
    // 
  })

  // BONUS: Force kullanarak alternatif test
  it('should select ingredients using force option (alternative)', () => {
    cy.get('.order-btn').click()
    
    // Force ile gizli input'lara erişim
    cy.get('input[type="checkbox"]').eq(0).check({force: true})
    cy.get('input[type="checkbox"]').eq(1).check({force: true})
    cy.get('input[type="checkbox"]').eq(2).check({force: true})
    cy.get('input[type="checkbox"]').eq(3).check({force: true})
    
    // Seçili olduğunu kontrol et
    cy.get('input[type="checkbox"]:checked').should('have.length', 4)
  })

  // BONUS: Daha detaylı malzeme seçim testi
  it('should prevent selecting more than 10 ingredients', () => {
    cy.get('.order-btn').click()
    
    // Tüm malzemeleri seç
    const malzemeler = ['Pepperoni', 'Domates', 'Biber', 'Sosis', 'Mısır', 'Sucuk', 
                       'Kanadali Jambon', 'Tavuk Izgara', 'Soğan', 'Ananas', 'Jalapeno']
    
    // İlk 10'unu seç
    malzemeler.slice(0, 10).forEach(malzeme => {
      cy.contains(malzeme).click()
    })
    
    // 11. yi seçmeye çalış - seçilmemeli
    cy.contains('Jalapeno').click()
    
    // Maksimum 10 seçili olmalı
    cy.get('input[type="checkbox"]:checked').should('have.length', 10)
  })
})