/** @file login */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,jqgridCommons,showTrend,updatePagerIcons,parseDate */
$(function () {

    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    // 显示统计数据
    function showStatistics(rowId) {
        var params = {};
        var row = $(gridSelector).jqGrid('getRowData', rowId);

        params.groupCode = row.groupCode;
        params.groupValue = row.groupValue;
        params.endTime = row.endTime;
        params.seconds = row.statisticsInterval;


        $.ajax({
            type: 'POST',
            url: Env.context + '/statistics/deviceLogStat/getTrend.json',
            data: params,
            dataType: 'json',
            jsonReader: jqgridCommons.jsonReader,
            success: function (re) {
                var usageData = re.data.rows;
                if (!usageData || usageData.length === 0) {
                    alert('找不到统计数据~');
                    return;
                }
                $('#statisticsModal').modal({show: true, backdrop: true});

                var title = 'App 用时统计趋势图' + '（' + row.endTime + ')';
                var container = $('#statisticsContainer');
                showRequestStatHighStock(container, title, usageData);
            }
        });
    }

    function showRequestStatHighStock(container, title, data) {
        var tempData = {
            totalCount: [],
            avgDuration: [],
            avgQualityDuration: [],
            avgTrackDuration: [],
            avgGateDuration: [],
            recCount: []
        };

        for (var i = 0; i < data.length; i++) {
            var date = parseDate(data[i].endTime);

            tempData.totalCount.push({
                x: date,
                y: data[i].totalCount
            });
            tempData.avgDuration.push({
                x: date,
                y: data[i].avgDuration || 0.0
            });
            tempData.avgQualityDuration.push({
                x: date,
                y: data[i].avgQualityDuration || 0.0
            });
            tempData.avgTrackDuration.push({
                x: date,
                y: data[i].avgTrackDuration || 0.0
            });
            tempData.avgGateDuration.push({
                x: date,
                y: data[i].avgGateDuration || 0.0
            });
            tempData.recCount.push({
                x: date,
                y: data[i].recCount
            });
        }

        var seriesOptions = [
            {
                name: '请求数',
                data: tempData.totalCount
            },
            {
                name: '总平均用时(ms)',
                dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 1
                },
                data: tempData.avgDuration,
                yAxis: 1
            },
            {
                name: '质量检测平均用时(ms)',
                dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 1
                },
                data: tempData.avgQualityDuration,
                yAxis: 1
            },
            {
                name: '追踪平均用时(ms)',
                dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 1
                },
                data: tempData.avgTrackDuration,
                yAxis: 1
            },
            {
                name: '闸机开门平均用时(ms)',
                dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 1
                },
                data: tempData.avgGateDuration,
                yAxis: 1
            },
            {
                name: '识别接口调用次数',
                data: tempData.recCount
            }
        ];
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
                        text: '耗时 (ms)',
                        style: {
                            color: '#ff5a0d'
                        }
                    },
                    min: 0,
                    labels: {
                        formatter: function () {
                            return this.value;
                        },
                        style: {
                            color: '#ff5a0d'
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

        showTrend(container, title, seriesOptions, options);
    }


    jQuery(gridSelector).jqGrid({
        url: Env.context + '/statistics/deviceLogStat/getData.json',
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['区间开始时间', '时间段', '请求数', '平均用时(ms)', '质量检测平均用时(ms)', '追踪平均用时(ms)',
            '闸机开门平均用时(ms)', '识别接口调用次数', '图表', '0', '1', '2', '3'],
        colModel: [
            {name: 'beginTime', index: 'beginTime', width: '12%'},
            {
                name: 'statisticsInterval', index: 'statisticsInterval', width: '4%',
                formatter: function (value, row, index) {
                    // 0：false 否               1：true  是
                    if (value === 60) {
                        return '分钟';
                    } else if (value === 60 * 60 * 24) {
                        return '天';
                    } else if (value === 60 * 60 * 24 * 30) {
                        return '月';
                    }
                    return value;
                }
            },
            {name: 'totalCount', index: 'totalCount', width: '4%'},
            {
                name: 'avgDuration', index: 'avgDuration', width: '8%',
                formatter: function (value, row, index) {
                    return value ? value.toFixed(1) : '';
                }
            },
            {
                name: 'avgQualityDuration', index: 'avgQualityDuration', width: '10%',
                formatter: function (value, row, index) {
                    return value ? value.toFixed(1) : '';
                }
            },
            {
                name: 'avgTrackDuration', index: 'avgTrackDuration', width: '10%',
                formatter: function (value, row, index) {
                    return value ? value.toFixed(1) : '';
                }
            },
            {
                name: 'avgGateDuration', index: 'avgGateDuration', width: '12%',
                formatter: function (value, row, index) {
                    return value ? value.toFixed(1) : '';
                }
            },
            {name: 'recCount', index: 'recCount', width: '8%'},
            {
                name: 'oper', index: '', sortable: false, width: '6%',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-info statistics-handler btn-minier" '
                        + 'style="padding: 1px 6px;margin: 0 10px;">趋势</button>';
                }
            },
            {name: 'endTime', index: 'endTime', hidden: true},
            {name: 'groupCode', index: 'groupCode1', hidden: true},
            {name: 'statisticsInterval', index: 'statisticsInterval1', hidden: true},
            {name: 'groupCode', index: 'groupCode', hidden: true}
        ],
        autowith: true,
        viewrecords: true,
        rowNum: 20,
        rowList: [10, 20, 30, 50, 100],
        pager: pagerSelector,
        altRows: true,
        sortname: 'id',
        multiboxonly: true,
        jsonReader: jqgridCommons.jsonReader,
        loadComplete: updatePagerIcons,
        onCellSelect: function (rowid, index, contents, event) {
            if ($(event.target).hasClass('statistics-handler')) {
                showStatistics(rowid);
            }
        }
    })
    ;
    $(window).triggerHandler('resize.jqGrid');

    // search
    $('.search-form-btn').on('click', function () {
        $(gridSelector).setGridParam({postData: null});
        $(gridSelector).jqGrid('setGridParam', {
            datatype: 'json',
            postData: $('#search-form').serializeJSON(),
            page: 1
        }).trigger('reloadGrid');  // 重新载入
    });

    // reset
    $('.cancel-form-btn').on('click', function () {
        var f = $('#search-form');
        f.find('select').val('').trigger('chosen:updated');
        f[0].reset();
    });


});