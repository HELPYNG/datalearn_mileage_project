document.addEventListener('DOMContentLoaded', () => {
    Highcharts.chart('grafico1', {
        chart: {
            type: 'bar',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Exemplo de Gráfico 1'
        },
        xAxis: {
            categories: ['Categoria 1', 'Categoria 2', 'Categoria 3']
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        },
        series: [{
            name: 'Série 1',
            data: [5, 10, 7]
        }]
    });

    
    Highcharts.chart('grafico2', {
        chart: {
            type: 'pie',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Exemplo de Gráfico 2'
        },
        series: [{
            name: 'Valores',
            data: [
                ['Categoria A', 45],
                ['Categoria B', 30],
                ['Categoria C', 25]
            ]
        }]
    });

    // Gráfico de Linha (grafico3)
    Highcharts.chart('grafico3', {
        chart: {
            type: 'line',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Exemplo de Gráfico 3'
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai']
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        },
        series: [{
            name: 'Série 1',
            data: [10, 15, 12, 8, 20]
        }]
});



    Highcharts.chart('grafico4', {
        chart: {
            type: 'area',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Exemplo de Gráfico de Área'
        },
        xAxis: {
            categories: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5']
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        },
        series: [{
            name: 'Série 1',
            data: [30, 45, 60, 40, 55]
        }]
});


});
