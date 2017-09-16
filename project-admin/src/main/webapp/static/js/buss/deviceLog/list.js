/*
 * Copyright (C) 2016 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,moment,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/deviceLog/getData.json';
    var viewUrl = Env.context + '/deviceLog/view';

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
        colNames: ['设备', '设备请求id', '接收时间', '用时(ms)', '操作', 'id'],
        colModel: [
            {name: 'deviceCode', index: 'deviceCode', width: '15%'},
            {name: 'deviceReqId', index: 'requestUri', width: '20%'},
            {name: 'receiveTime', index: 'start', width: '20%'},
            {
                name: 'dur', index: 'dur', width: '10%',
                formatter: function (cell, options, row) {
                    var color = cell < 1000 ? 'green' : 'red';
                    return '<span style="color:' + color + '">' + cell + '</span> ';
                }
            },

            {
                name: 'oper', index: '', width: '10%', sortable: false,
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
        // multiselect: false,
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