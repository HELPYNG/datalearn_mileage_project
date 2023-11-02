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

                credits: {
                    enabled: false
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
            const cursos = [...new Set(data.map(item => item.CURSO))];
            const series = cursos.map(curso => {
                const cursoData = data.filter(item => item.CURSO === curso);
                return {
                    name: curso,
                    data: cursoData.map(item => ({
                        name: item.ALUNO,
                        x: parseFloat(item.MEDIA_PROGRESSO),
                        y: parseFloat(item.MEDIA_NOTAS)
                    }))
                };
            });
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
                    },
                    min:0,
                    max:100
                },
                yAxis: {
                    title: {
                        text: 'Média de Notas'
                    },
                    max:10
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

                credits: {
                    enabled: false
                },

                series: series
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
            const cursos = [...new Set(data.map(item => item.Curso))];
            const series = cursos.map(curso => {
                const cursoData = data.filter(item => item.Curso === curso);
                console.log(curso, cursoData);
                return {
                    name: curso,
                    data: cursoData.map(item => ({
                        name: new Date(item.Data).toLocaleDateString(),
                        y: parseInt(item.TotalVisualizacoes, 10)
                    }))
                };
            });

            console.log(series);

            Highcharts.chart('grafico3', {
                chart: {
                    type: 'area',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Visualizações Diárias por Curso'
                },
                xAxis: {
                    categories: series[0].data.map(item => item.name)
                },
                yAxis: {
                    title: {
                        text: 'Total de Visualizações'
                    }
                },
                plotOptions: {
                    area: {
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

                credits: {
                    enabled: false
                },

                series: series
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
});



document.addEventListener('DOMContentLoaded', () => {
    Highcharts.chart('curso1', {
        chart: {
            type: 'solidgauge',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Meta'
        },
        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                backgroundColor: '#ccc',
                borderWidth: 0,
                outerRadius: '109%'
            }]
        },
        yAxis: {
            min: 0,
            max: 1000,
            title: {
                text: 'Valor'
            },
            stops: [
                [0.1, '#55BF3B'],
                [0.5, '#DDDF0D'],
                [0.9, '#DF5353']
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            labels: {
                y: 16
            }
        },
        series: [{
            name: 'Meta',
            data: [500],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">Valor</span></div>'
            }
        }]
    });
});





function cores(chartData) {
    return chartData.map(item =>{
        let color;
        if(item.name === 'Java') {
            color = 'blue'
        } else if(item.name == 'Python') {
            color = 'green'
        } else if(item.name == 'C#') {
            color = ''
        } else if(item.name == 'JavaScript') {
            color = 'orange'
        }

        item.color = color;
        return item;
    });
}