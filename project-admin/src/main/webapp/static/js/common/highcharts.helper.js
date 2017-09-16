/** @file highCharts util */
/* globals CONS,Env,Highcharts,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted,Process,JE */


(function ($) {
    'use strict';

    // global config
    Highcharts.setOptions({});

    // 色彩集合
    var defaultColors = ['#ff7f50', '#87b87f', '#6fb3e0', '#ffb752', '#d15b47', '#87cefa',
        '#da70d6', '#32cd32', '#6495ed', '#ff69b4', '#ba55d3', '#cd5c5c'];
    var defaultFontFamily = '"Microsoft YaHei", "lucida grande", helvetica, verdana, arial, sans-serif';

    // 定义
    $.fn.extend({

        /**
         * 饼图
         * @param {Array} cusData 数据
         * @param {Object} cusOptions 配置
         * @return {pie} this
         */
        pie: function (cusData, cusOptions) {
            var defaults = {
                titleText: '饼图',
                pointFormat: '<b>数量：{point.y} </b><br/> <b>占比: {point.percentage:.2f}%</b>',
                dataLabelsFormat: '{point.name}: <b>{point.percentage:.2f}%</b>',
                colors: defaultColors,
                sliced: true,
                selectedIdx: 0,
                titleStyle: {
                    // color: '#6fb3e0',
                    fontWeight: 'bold',
                    fontFamily: defaultFontFamily
                },

                /**
                 *  mapping
                 * @param {Array} dataArr dataArr
                 * @return {Array} data
                 */
                dataMapping: function (dataArr) {
                    var retData = [];
                    if (dataArr && Array.isArray(dataArr)) { // IE9+ support
                        $.each(dataArr, function (idx, vo) {
                            if (!('name' in vo)) {
                                console.error('dataArr [name] property is necessary');
                            }
                            if (!('value' in vo)) {
                                console.error('dataArr [value] property is necessary');
                            }
                            retData.push({
                                name: vo.name,
                                y: vo.value
                            });
                        });
                    }
                    return retData;

                }
            };
            // 配置整合
            var options = $.extend({}, defaults, cusOptions);

            // 数据
            var data = options.dataMapping(cusData);
            if (data && data.length > options.selectedIdx) {
                var selectVo = data[options.selectedIdx];
                var sliced = {sliced: options.sliced, selected: true};
                data[options.selectedIdx] = $.extend({}, selectVo, sliced);
            }
            $(this.selector).highcharts({
                credits: {
                    enabled: false
                },
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: options.titleText,
                    style: options.titleStyle
                },
                tooltip: {
                    pointFormat: options.pointFormat
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        colors: options.colors,
                        size: '80%', // 手动控制饼图的大小，要不会变化
                        dataLabels: {
                            enabled: true,
                            format: options.dataLabelsFormat,
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'brands',
                    colorByPoint: true,
                    data: data
                }]
            });
            return this;
        },

        /**
         * 柱状折综合线图 todo: 不灵活，写的比较死
         * @param {Array} cusData cusData
         * @param {Object} cusOptions cusOptions
         * @return {mixedGraph} this
         */
        mixedGraph: function (cusData, cusOptions) {
            var defaults = {
                titleText: '柱状折线混合图',
                xCategories: undefined, // 必须的
                dataLabelsFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                colors: defaultColors,
                sliced: true,
                selectedIdx: 0,
                titleStyle: {
                    color: '#6fb3e0',
                    fontWeight: 'bold',
                    fontFamily: defaultFontFamily
                },
                // 返回的数据格式:{name:'nameValue',type:'column',data:[v1,v2,v3]}
                dataMapping: function (dataVo) {
                    if (!('name' in dataVo)) {
                        console.error('dataVo [name] property is necessary');
                    }
                    if (!('type' in dataVo)) {
                        console.error('dataVo [type] property is necessary');
                    }
                    if (!('data' in dataVo)) {
                        console.error('dataVo [type] property is necessary');
                    }
                    if (!Array.isArray(dataVo.data)) {
                        console.error('dataVo [data] must be array');
                    }
                    if (dataVo.formatType === 'percent') {
                        dataVo = $.extend({}, dataVo, {
                            tooltip: {
                                valueDecimals: 2,
                                valueSuffix: ' %'
                            }
                        });
                    }
                    return dataVo;
                }
            };
            // 配置整合
            var options = $.extend({}, defaults, cusOptions);

            // 数据
            var data = [];
            if (cusData && Array.isArray(cusData)) {
                $.each(cusData, function (idx, item) {
                    data.push(options.dataMapping(item));
                });
            } else {
                data.push(options.dataMapping(cusData));
            }

            $(this.selector).highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: options.titleText
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                xAxis: {
                    categories: options.xCategories
                },
                yAxis: [
                    { // Primary yAxis
                        labels: {
                            format: '{value}',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        },
                        title: {
                            text: '数量',
                            style: {
                                color: Highcharts.getOptions().colors[1]
                            }
                        }
                    },
                    { // Secondary yAxis
                        max: 1,
                        title: {
                            text: '成功率',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            formatter: function () {
                                return Highcharts.numberFormat(this.value * 100, 0) + '%';
                            },
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        opposite: true
                    }
                ],
                plotOptions: {
                    series: {
                        stacking: null
                    }
                },
                labels: {
                    items: [{
                        style: {
                            left: '100px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }]
                },
                // series
                series: data
            });
            return this;
        }
    });
})(jQuery);