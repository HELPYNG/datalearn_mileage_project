document.addEventListener('DOMContentLoaded', async () => {
    fetch('/obterVendasDiarias')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            return response.json();
        })
        .then(data => {
            const cursos = [...new Set(data.map(item => item.Curso))];
            const series = cursos.map(curso => {
                const cursoData = data.filter(item => item.Curso === curso);
                return {
                    name: curso,
                    data: cursoData.map(item => ({
                        x: new Date(item.Data).getTime(),
                        y: parseInt(item.TotalVendas, 10)
                    }))
                };
            });

            Highcharts.chart('curso2', {
                chart: {
                    type: 'area',

                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Vendas Diárias por Curso'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Data'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Total de Vendas'
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
            console.error('Erro ao obter dados de vendas diárias:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/obterReceitaMensal')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            return response.json();
        })
        .then(data => {
            const cursos = data.map(item => item.Curso);
            const receitas = data.map(item => parseFloat(item.ReceitaTotal));

            Highcharts.chart('curso3', {
                chart: {
                    type: 'bar',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Receita  por Curso'
                },
                xAxis: {
                    categories: cursos,
                    title: {
                        text: 'Curso'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Receita Total'
                    }
                },
                series: [{
                    data: receitas
                }],
                credits: {
                    enabled: false
                }
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados de receita mensal:', error);
        });
});
