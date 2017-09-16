/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/ticketLog/getData.json';
    var viewUrl = Env.context + '/ticketLog/view';
    var exportUrl = Env.context + '/ticketLog/export';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    // 默认开始时间 开启的时候 考虑首次查询按照默认时间来...
    // $("#beginTime").val(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'));

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['组织编号', '游客编号', '订单编号', '票务编号', '开始时间', '结束时间', '操作', 'ID'],
        colModel: [
            {name: 'unitCode', index: 'unitCode', width: '10%'},
            {name: 'visitorUucode', index: 'visitorUucode', width: '10%'},
            {name: 'orderCode', index: 'orderCode', width: '15%'},
            {name: 'ticketCode', index: 'ticketCode', width: '15%'},
            {name: 'startTime', index: 'startTime', width: '15%'},
            {name: 'endTime', index: 'endTime', width: '15%'},
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