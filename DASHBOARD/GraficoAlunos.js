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


            const CoresGraficos = cores(chartData);

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
                    data: CoresGraficos
                }]
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/obterNotaPorProgresso')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const chartData = data.map(item => ({
                name: item.CURSO_NOME,
                x: parseFloat(item.MEDIA_PROGRESSO),
                y: parseFloat(item.MEDIA_NOTAS)
            }));

            Highcharts.chart('grafico2', {
                chart: {
                    type: 'scatter',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Nota por Progresso do Curso' 
                },
                xAxis: {
                    title: {
                        text: 'Média de Progresso %'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Média de Notas'
                    }
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Java',
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





function cores(chartData) {
    return chartData.map(item =>{
        let color;
        if(item.name === 'Java') {
            color = 'orange'
        } else if(item.name == 'Python') {
            color = 'green'
        } else if(item.name == 'C#') {
            color = ''
        }

        item.color = color;
        return item;
    });
}