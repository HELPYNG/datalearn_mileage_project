function fundoBranco() {
    const body = document.body;
    const menu = document.querySelector('.menu');
    const grafico1 = document.querySelector('.grafico1');
    const grafico2 = document.querySelector('.grafico2');
    const grafico3 = document.querySelector('.grafico3');
    const grafico4 = document.querySelector('.grafico4');
    const info = document.querySelector('.info');
    const thElements = document.querySelectorAll('th');
    const tdElements = document.querySelectorAll('td');

    body.style.backgroundColor = 'white';
    menu.style.backgroundColor = '#c2c7ca';
    grafico1.style.backgroundColor = '#c2c7ca';
    grafico2.style.backgroundColor = '#c2c7ca';
    grafico3.style.backgroundColor = '#c2c7ca';
    grafico4.style.backgroundColor = '#c2c7ca';
    info.style.backgroundColor = '#c2c7ca';
    thElements.forEach(function(th) {
        th.style.backgroundColor = '#777b80';
    });

    tdElements.forEach(function(td) {
        td.style.backgroundColor = '#cccfd1';
    });
    
    
}

    const mudarFundoBranco = document.getElementById('fundoBranco');
    mudarFundoBranco.addEventListener(click, fundoBranco());


function fundoEscuro() {
    const body = document.body;
    const menu = document.querySelector('.menu');
    const grafico1 = document.querySelector('.grafico1');
    const grafico2 = document.querySelector('.grafico2');
    const grafico3 = document.querySelector('.grafico3');
    const grafico4 = document.querySelector('.grafico4');
    const info = document.querySelector('.info');
    const thElements = document.querySelectorAll('th');
    const tdElements = document.querySelectorAll('td');

    body.style.backgroundColor = '';
    menu.style.backgroundColor = '';
    grafico1.style.backgroundColor = '';
    grafico2.style.backgroundColor = '';
    grafico3.style.backgroundColor = '';
    grafico4.style.backgroundColor = '';
    info.style.backgroundColor = '';
    thElements.forEach(function(th) {
        th.style.backgroundColor = '';
    });

    tdElements.forEach(function(td) {
        td.style.backgroundColor = '';
    });
}

    const mudarFundoEscuro = document.getElementById('fundoEscuro');
    mudarFundoEscuro.addEventListener(click, fundoEscuro())

