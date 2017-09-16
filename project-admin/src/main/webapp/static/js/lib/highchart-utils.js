/** @file login */
/* globals CONS,Env,Highcharts*/


// 初始化highchart
Highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        drillUpText: '返回上层'
    }
});

function showDrillPie(container, title, seriesData, drillDownSeries) {
    $(container).empty();

    var options = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'pie'
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '<b>{point.count}</b>/{point.y:.5f}%'
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '[{point.name}]: <b>{point.count}</b> / {point.y:.5f}%'
                }
            }
        },
        series: [
            {
                name: '短信数',
                type: 'pie',
                data: seriesData
            }
        ],
        drilldown: {
            series: drillDownSeries
        }
    };

    $(container).highcharts(options);
}


// 整个trend line by highchart
function showLine(container, title, countData, ratioData) {
    $(container).empty();

    var options = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%m-%d %H:%M', this.value);
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: '短信数'
                },
                labels: {
                    formatter: function () {
                        return this.value + ' 条';
                    },
                    style: {
                        color: '#AA4643'
                    }
                },
                min: 0
            },
            {
                title: {
                    text: '百分比'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    },
                    style: {
                        color: '#4572A7'
                    }
                },
                min: 0,
                opposite: true
            }
        ],
        legend: {
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 3
                }
            }
        },
        tooltip: {
            formatter: function () {
                var suffix = '条';
                var yValue = this.y;
                if (this.series.name === '百分比') {
                    suffix = '%';
                    yValue = this.y.toFixed(5);
                }

                return '<b>' + this.series.name + '</b><br/>'
                    + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + ': ' + yValue + suffix;
            }
        },
        series: [
            {
                name: '数量',
                color: '#AA4643',
                data: countData
            },
            {
                name: '百分比',
                color: '#4572A7',
                dashStyle: 'shortdot',
                yAxis: 1,
                suffixType: 1,
                data: ratioData
            }
        ]
    };

    $(container).highcharts(options);
}

// create with highstock
function showTrend(container, title, seriesOptions, config, customOptions) {
    var defaultOptions = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'spline'
        },
        title: {
            text: title
        },
        legend: {
            enabled: true
        },
        yAxis: [
            {
                title: {
                    text: '请求数',
                    style: {
                        color: '#AA4643'
                    }
                },
                min: 0,
                labels: {
                    formatter: function () {
                        return this.value;
                    },
                    style: {
                        color: '#AA4643'
                    }
                }
            },
            {
                title: {
                    text: '百分比'
                },
                min: 0,
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    },
                    style: {
                        color: '#4572A7'
                    }
                },
                opposite: true
            }
        ],
        rangeSelector: {
            buttons: [
                {
                    count: 1,
                    type: 'hour',
                    text: '1H'
                },
                {
                    count: 1,
                    type: 'day',
                    text: '1D'
                },
                {
                    count: 1,
                    type: 'month',
                    text: '1M'
                },
                {
                    type: 'all',
                    text: 'All'
                }
            ],
            selected: 0
        },
        series: seriesOptions
    };

    if (customOptions != null) {
        defaultOptions = customOptions;
    }

    var options = $.extend(defaultOptions, config || {});
    $(container).highcharts('StockChart', options);
}

function parseDate(dateString) {
    return new Date(dateString.replace(/-/g, '/')).getTime();
}