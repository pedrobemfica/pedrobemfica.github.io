function loadContent(page) {
     fetch(page)
         .then(response => response.text())
         .then(data => {
             document.getElementById('content').innerHTML = data;
         })
         .catch(error => console.error('Error loading content:', error));
}

export const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
