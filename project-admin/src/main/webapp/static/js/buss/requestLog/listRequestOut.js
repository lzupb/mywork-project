/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,moment,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/requestLog/getRequestOutData.json';
    var viewUrl = Env.context + '/requestLog/viewRequestOut';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    // 默认开始时间 开启的时候 考虑首次查询按照默认时间来...
    $('#beginTime').val(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'));

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'local',
        height: 'auto',
        mtype: 'POST',
        colNames: ['本地IP', '请求URI', '请求时间', '响应时间', '用时(ms)', '响应状态', '操作', 'id'],
        colModel: [
            {name: 'requestFrom', index: 'requestFrom', width: '12%'},
            {name: 'requestUri', index: 'requestUri', width: '33%'},
            {name: 'requestTime', index: 'requestTime', width: '12%'},
            {name: 'responseTime', index: 'responseTime', width: '12%'},
            {
                name: 'duration', index: 'duration', width: '9%',
                formatter: function (cell, options, row) {
                    var color = cell < 1000 ? 'green' : 'red';
                    return '<span style="color:' + color + '">' + cell + '</span> ';
                }
            },
            {name: 'status', index: 'status', width: '9%'},
            {
                name: 'oper', index: '', width: '8%', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        viewUrl: viewUrl,
                        viewLabel: '查看详情',
                        viewColNames: ['id']
                    }
                }
            },
            {name: 'id', index: 'id', hidden: true}
        ],
        autowith: true,
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30, 50, 100],
        pager: pagerSelector,
        altRows: true,
        // sortname: 'createTime_desc',
        jsonReader: jqgridCommons.jsonReader,
        // multiselect: true,
        // multiboxonly: true,
        loadComplete: updatePagerIcons
    });
    $(window).triggerHandler('resize.jqGrid');

    // search
    $('.search-form-btn').on('click', function () {
        $(gridSelector).setGridParam({
            postData: null
        });
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