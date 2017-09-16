/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals
 CONS,Env,enableChosen,enableJqGridAutoResize,window,moment,parseDate,showTrend,updatePagerIcons,jqgridCommons,bootbox */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/verifyLogStatistics/getData.json';
    var trendUrl = Env.context + '/verifyLogStatistics/getTrend.json';


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
            url: trendUrl,
            data: params,
            dataType: 'json',
            success: function (re) {
                var usageData = re.data.rows;
                if (!usageData || usageData.length === 0) {
                    alert('找不到统计数据~');
                    return;
                }
                $('#statisticsModal').modal({show: true, backdrop: true});

                var title = row.groupValue + '（' + row.endTime + 's)' + ' 识别趋势图';
                var container = $('#statisticsContainer');
                showRequestStatHighStock(container, title, usageData);
            }
        });
    }

    function showRequestStatHighStock(container, title, data) {
        var tempData = {
            totalCount: [],
            successCount: [],
            successRate: []
        };

        for (var i = 0; i < data.length; i++) {
            var date = parseDate(data[i].endTime);

            tempData.totalCount.push({
                x: date,
                y: data[i].totalCount
            });
            tempData.successCount.push({
                x: date,
                y: data[i].successCount
            });
            tempData.successRate.push({
                x: date,
                y: data[i].successRate * 100
            });
        }

        var seriesOptions = [
            {
                name: '识别数',
                data: tempData.totalCount
            },
            {
                name: '正确数',
                data: tempData.successCount
            },
            {
                name: '正确率',
                yAxis: 1,
                // dashStyle: 'shortdot',
                tooltip: {
                    valueDecimals: 3,
                    valueSuffix: '%'
                },
                data: tempData.successRate
            }
        ];

        showTrend(container, title, seriesOptions);
    }

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['统计维度', '统计值', '统计名称', '区间开始时间', '时间段', '识别数', '正确数', '正确率', '图表',
            '0', '1', '2', '3'],
        colModel: [
            {name: 'groupName', index: 'groupName', width: '8%'},
            {name: 'groupValue', index: 'groupValue', width: '12%'},
            {name: 'groupDesc', index: 'groupDesc', width: '35%'},
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
            {name: 'totalCount', index: 'totalCount', width: '8%'},
            {name: 'successCount', index: 'successCount', width: '8%'},
            {
                name: 'successRate', index: 'successRate', width: '6%',
                formatter: 'percentage', formatoptions: {decimalPlaces: 3}
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
        sortname: 'id',
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
        }).trigger('reloadGrid'); // 重新载入
    });

    // reset
    $('.cancel-form-btn').on('click', function () {
        var sform = $('#search-form');
        sform.find('select').val('').trigger('chosen:updated');
        sform[0].reset();
    });
});