export class HomeView {
    constructor() {        
        this.scrollspyHome = document.getElementById('scrollspyHome')
        this.updateView()
    }
    
    updateView() {
        const scrollSpy = new bootstrap.ScrollSpy(document.body, {
            target: '#navbar-home',
            offset: 500
          })
          console.log(scrollSpy)
    }
}