/** @file login */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,showTrend,updatePagerIcons,parseDate,jqgridCommons */

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
            url: Env.context + '/requestInLogStatistic/getTrend.json',
            data: params,
            dataType: 'json',
            success: function (re) {
                var usageData = re.data;
                if (!usageData || usageData.length === 0) {
                    alert('找不到统计数据~');
                    return;
                }
                $('#statisticsModal').modal({show: true, backdrop: true});

                var title = row.groupValue + '（' + row.endTime + 's)' + ' 请求趋势图';
                var container = $('#statisticsContainer');
                showRequestStatHighStock(container, title, usageData);
            }
        });
    }

    function showRequestStatHighStock(container, title, data) {
        var tempData = {
            totalCount: [],
            successCount: [],
            successRate: [],
            duration: []
        };

        for (var i = 0; i < data.rows.length; i++) {
            var date = parseDate(data.rows[i].endTime);

            tempData.totalCount.push({
                x: date,
                y: data.rows[i].totalCount
            });
            tempData.successCount.push({
                x: date,
                y: data.rows[i].successCount
            });
            tempData.successRate.push({
                x: date,
                y: data.rows[i].successRate * 100
            });
            tempData.duration.push({
                x: date,
                y: data.rows[i].duration || 0.0
            });
        }

        var seriesOptions = [
            {
                name: '请求数',
                data: tempData.totalCount
            },
            {
                name: '正确数',
                data: tempData.successCount
            },
            {
                name: '正确率',
                yAxis: 1,
                tooltip: {
                    valueDecimals: 3,
                    valueSuffix: '%'
                },
                data: tempData.successRate
            },
            {
                name: '平均用时(ms)',
                dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 1
                },
                data: tempData.duration
            }
        ];

        showTrend(container, title, seriesOptions);
    }


    jQuery(gridSelector).jqGrid({
        url: Env.context + '/requestInLogStatistic/getData.json',
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['统计维度', '统计值', '区间开始时间', '时间段', '请求数', '正确数', '正确率', '平均用时(ms)', '图表', '0', '1', '2', '3'],
        colModel: [
            {name: 'groupName', index: 'groupName', width: '10%'},
            {name: 'groupValue', index: 'groupValue', width: '15%'},
            {name: 'beginTime', index: 'beginTime', width: '12%'},
            {
                name: 'statisticsInterval', index: 'statisticsInterval', width: '5%',
                formatter: function (value, row, index) {
                    // 0：false 否               1：true  是
                    if (value === 60) {
                        return '1分钟';
                    } else if (value === 60 * 60 * 24) {
                        return '天';
                    } else if (value === 60 * 60 * 24 * 30) {
                        return '月';
                    }
                    return value;
                }
            },
            {name: 'totalCount', index: 'totalCount', width: '13%'},
            {name: 'successCount', index: 'successCount', width: '13%'},
            {
                name: 'successRate', index: 'successRate', width: '16%',
                formatter: 'percentage', formatoptions: {decimalPlaces: 3}
            },
            {
                name: 'duration', index: 'duration', width: '16%',
                formatter: function (value, row, index) {
                    return value ? value.toFixed(1) : '';
                }
            },
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
        multiboxonly: true,
        jsonReader: jqgridCommons.jsonReader,
        loadComplete: updatePagerIcons,
        onCellSelect: function (rowid, index, contents, event) {
            if ($(event.target).hasClass('statistics-handler')) {
                showStatistics(rowid);
            }
        }
    });
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