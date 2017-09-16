/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons,bootbox */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/verifyLog/getData.json';
    var viewUrl = Env.context + '/verifyLog/view';
    var exportUrl = Env.context + '/verifyLog/export';


    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['top1游客', '活体结果', '相似度', '判断结果', '设备名称', '识别时间', '操作', 'id'],
        colModel: [
            {name: 'visitorName', index: 'visitorName', sortable: false},
            {
                name: 'livingCheck', index: 'livingCheck', sortable: false,
                formatter: function (livingCheck, options, row) {
                    if (!livingCheck) {
                        return '未检测';
                    } else {
                        var result = row['livingResult'] === true ? '正常' : '异常';
                        var color = row['livingResult'] === true ? 'green' : 'red';
                        return '<span style="color:' + color + '">'
                            + result + '</span> (' + row['livingScores'].toFixed(7) + ')';
                    }
                }
            },
            {
                name: 'scores', index: 'scores', sortable: false,
                formatter: function (cell) {
                    if (cell !== undefined && cell !== '' && typeof cell === 'number') {
                        return cell.toFixed(7);
                    } else {
                        return cell || '';
                    }
                }
            },
            {
                name: 'valid', index: 'valid', sortable: false,
                formatter: function (cell, options, row) {
                    var text = cell === true ? '正确' : '错误';
                    var color = cell === true ? 'green' : 'red';
                    var errorMsg = '';
                    if (cell === false && row['message']) {
                        errorMsg = '(' + row['message'] + ')';
                    }
                    return '<span style="color:' + color + '">' + text + '</span> ' + errorMsg;
                }
            },
            {name: 'deviceName', index: 'deviceName', sortable: false},
            {name: 'requestTime', index: 'requestTime', sortable: false},
            {
                name: 'oper', index: '', width: '60px', sortable: false,
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
        multiboxonly: true,
        loadComplete: updatePagerIcons
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

    // export
    $('#exportBtn').on('click', function () {
        bootbox.dialog({
            message: '是否下载符合查询条件的日志？',
            title: '下载提示',
            buttons: {
                confirm: {
                    label: '确定',
                    className: 'btn-danger',
                    callback: function () {
                        var data = $('#search-form').serializeJSON();
                        var paramStr = $.param(data);
                        window.open(exportUrl + '?' + paramStr);
                    }
                },
                cancel: {
                    label: '取消',
                    className: 'btn-primary',
                    callback: function () {
                    }
                }
            }
        });
    });
});