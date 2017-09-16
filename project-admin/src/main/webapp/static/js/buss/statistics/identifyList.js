/** @file login */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,showTrend,updatePagerIcons,parseDate */

$(function () {

    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    // 显示统计数据(线图)
    function showStatistics(rowId) {
        var params = {};
        var row = $(gridSelector).jqGrid('getRowData', rowId);

        params.groupCode = row.groupCode;
        params.groupValue = row.groupValue;
        params.scoreDesc = row.scoreDesc;
        params.endTime = row.endTime;
        params.seconds = row.statisticsInterval;


        $.ajax({
            type: 'POST',
            url: Env.context + '/statistics/identify/getTrend.json',
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


    // 显示统计数据(饼图)
    function showStatisticsPie(rowId) {
        var params = {};
        var row = $(gridSelector).jqGrid('getRowData', rowId);

        params.code = row.code;
        params.groupCode = row.groupCode;
        params.groupDesc = row.groupDesc;
        params.beginTime = row.beginTime;
        params.endTime = row.endTime;
        params.seconds = row.statisticsInterval;


        $.ajax({
            type: 'POST',
            url: Env.context + '/statistics/identify/getPie.json',
            data: params,
            dataType: 'json',
            success: function (re) {
                var usageData = re.items;
                if (!usageData || usageData.length === 0) {
                    alert('找不到统计数据~');
                    return;
                }
                $('#statisticsModal').modal({show: true, backdrop: true});

                var title = '（' + row.endTime + 's)' + ' 占比分布图';
                // var container = $('#statisticsContainer');
                $('#statisticsContainer').pie(usageData, {selectedIdx: 8});
               // showDrillPie(container, title, usageData.percent,null);
            }
        });
    }

    function showRequestStatHighStock(container, title, data) {
        var tempData = {
            sumCount: [],
            percent: []
        };

        for (var i = 0; i < data.length; i++) {
            var date = parseDate(data[i].endTime);

            tempData.sumCount.push({
                x: date,
                y: data[i].sumCount
            });

            tempData.percent.push({
                x: date,
                y: data[i].percent
            });

        }

        var seriesOptions = [
            {
                name: '识别数',
                data: tempData.sumCount
            },
            {
                name: '识别占比',
                yAxis: 1,
                tooltip: {
                    valueDecimals: 3,
                    valueSuffix: '%'
                },
                data: tempData.percent
            }
        ];

        showTrend(container, title, seriesOptions);
    }


    jQuery(gridSelector).jqGrid({
        url: Env.context + '/statistics/identify/getData.json',
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['统计维度', '统计值', '统计名称', '区间开始时间', '分数段', '请求数', '请求占比%',
            '请求总数', '周期', '图表', '0', '1', '2', '3', '4'],
        colModel: [
            {name: 'groupName', index: 'groupName', width: '11%', sortable: false},
            {name: 'groupValue', index: 'groupValue', width: '15%', sortable: false},
            {name: 'groupDesc', index: 'groupDesc', width: '11%', sortable: false},
            {name: 'beginTime', index: 'beginTime', width: '16%', sortable: false},
            {name: 'scoreDesc', index: 'scoreDesc', width: '8%', sortable: false},
            {name: 'sumCount', index: 'sumCount', width: '7%', sortable: false},
            {name: 'percent', index: 'percent', width: '7%', sortable: false},
            {name: 'perCount', index: 'perCount', width: '7%', sortable: false},

            {
                name: 'statisticsInterval', index: 'statisticsInterval', width: '4%', sortable: false,
                formatter: function (value, row, index) {
                    // 0：false 否               1：true  是
                    if (value === 60 * 60 * 24 * 30) {
                        return '月';
                    } else if (value === 60 * 60 * 24) {
                        return '天';
                    } else if (value === 60) {
                        return '分';
                    }
                    return value;
                }
            },
            {
                name: 'oper', index: '', sortable: false, width: '12%', sortable: false,
                formatter: function (value, row, index) {
                    return '<button class="btn btn-info line-handler btn-minier" '
                        + 'style="padding: 1px 6px;margin: 0 10px;">趋势</button>'
                        + '<button class="btn btn-info pie-pie btn-minier" '
                        + 'style="padding: 1px 6px;margin: 0 10px;">分布</button>';
                }
            },
            {name: 'endTime', index: 'endTime', hidden: true},
            {name: 'groupCode', index: 'groupCode1', hidden: true},
            {name: 'statisticsInterval', index: 'statisticsInterval1', hidden: true},
            {name: 'groupCode', index: 'groupCode', hidden: true},
            {name: 'code', index: 'code', hidden: true}

        ],
        autowith: true,
        viewrecords: true,
        rowNum: 20,
        rowList: [10, 20, 30, 50, 100],
        pager: pagerSelector,
        altRows: true,
        sortname: 'id',
        multiboxonly: true,
        loadComplete: updatePagerIcons,
        onCellSelect: function (rowid, index, contents, event) {
            if ($(event.target).hasClass('line-handler')) {
                showStatistics(rowid);
            }
            if ($(event.target).hasClass('pie-pie')) {
                showStatisticsPie(rowid);
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