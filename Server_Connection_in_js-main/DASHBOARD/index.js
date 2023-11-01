function darkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");

    var dark_mode = body.classList.contains("dark-mode");
    if(dark_mode) {
        body.style.backgroundColor = '#434444';    
        localStorage.setItem('darkMode', 'ativado');
    } else {
        body.style.backgroundColor = '';
        localStorage.setItem('darkMode', 'desativado');
    }   
}

document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'ativado') {
        body.classList.add('dark-mode');
        body.style.backgroundColor = '#434444';
    }
});



