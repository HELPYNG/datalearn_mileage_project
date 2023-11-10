document.addEventListener('DOMContentLoaded', () => {
    const dadosMediasCursos = [
        { curso: 'C#', media: 4.1, color: 'blue' },
        { curso: 'Java', media: 5.0, color: 'grey' },
        { curso: 'JavaScript', media: 4.2, color: 'orange' },
        { curso: 'Python', media: 2.8, color: 'green' },
    ];

    const cursos = dadosMediasCursos.map(item => item.curso);
    const medias = dadosMediasCursos.map(item => ({
        y: item.media,
        color: item.color,
    }));

    Highcharts.chart('curso1', {
        chart: {
            type: 'column',
            backgroundColor: "#c2c7ca"
        },
        title: {
            text: 'Avaliações dos Cursos'
        },
        xAxis: {
            categories: cursos,
            title: {
                text: 'Cursos'
            }
        },
        yAxis: {
            title: {
                text: 'Média de Avaliações'
            },
            max: 5
        },
        series: [{
            name: 'Médias',
            data: medias
        }]
    });
});


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
            
            // Chame a função cores para mapear as cores com base nos nomes dos cursos
            const coresGrafico = cores(cursos);

            Highcharts.chart('curso3', {
                chart: {
                    type: 'bar',
                    backgroundColor: "#c2c7ca"
                },
                title: {
                    text: 'Receita por Curso'
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
                // Defina as cores com base no resultado da função cores
                plotOptions: {
                    series: {
                        colorByPoint: true,
                        colors: coresGrafico,
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


function cores(cursos) {
    return cursos.map(curso => {
        let color;
        if (curso === 'Java') {
            color = 'grey';
        } else if (curso === 'Python') {
            color = 'green';
        } else if (curso === 'C#') {
            color = 'blue'; // Defina a cor desejada para C#
        } else if (curso === 'JavaScript') {
            color = 'orange';
        }
        return color;
    });
}
