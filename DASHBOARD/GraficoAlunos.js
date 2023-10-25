document.addEventListener('DOMContentLoaded', () => {
    fetch('/obterMediasDasNotas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const chartData = data.map(item => ({
                name: item.CURSO_NOME,
                y: parseFloat(item.MEDIA_NOTAS)
            }));

            Highcharts.chart('grafico1', {
                chart: {
                    type: 'column',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Média das notas'
                },
                xAxis: {
                    categories: chartData.map(item => item.name)
                },
                yAxis: {
                    title: {
                        text: 'Média de Notas'
                    }
                },
                series: [{
                    name: 'Média de Notas',
                    data: chartData
                }]
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/obterProgressoDosAlunos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const chartData = data.map(item => ({
                name: item.CURSO_NOME,
                y: parseFloat(item.MEDIA_PROGRESSO_CURSO) 
            }));

            Highcharts.chart('grafico2', {
                chart: {
                    type: 'bar',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Média de Progresso dos Alunos por Curso' 
                },
                xAxis: {
                    categories: chartData.map(item => item.name)
                },
                yAxis: {
                    title: {
                        text: 'Média de Progresso %'
                    }
                },
                series: [{
                    name: 'Média de Progresso',
                    data: chartData
                }]
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/obterVisualizacoes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const chartData = data.map(item => ({
                name: new Date(item.Data).toLocaleDateString(),
                y: parseInt(item.TotalVisualizacoes, 10)
            }));

            Highcharts.chart('grafico3', {
                chart: {
                    type: 'area',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Visualizações Java'
                },
                xAxis: {
                    categories: chartData.map(item => item.name)
                },
                yAxis: {
                    title: {
                        text: 'Total de Visualizações'
                    }
                },
                series: [{
                    name: 'Visualizações',
                    data: chartData.map(item => item.y)
                }]
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
});

