/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/visitor/getData.json';
    var deleteJsonUrl = Env.context + '/visitor/delete.json';
    var updateUrl = Env.context + '/visitor/update';
    var viewUrl = Env.context + '/visitor/view';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        postData: $('#search-form').serializeJSON(),
        height: 'auto',
        mtype: 'POST',
        colNames: ['组织编号', '注册时间', 'userId', '游客名称', '证件类型', '证件编号', '用户状态', '操作'],
        colModel: [
            {name: 'unitCode', index: 'unitCode', width: '10%', sortable: false},
            {name: 'createdDate', index: 'createdDate', width: '14%', sortable: false},
            {name: 'visitorCode', index: 'visitorCode', width: '20%', sortable: false},
            {name: 'visitorName', index: 'visitorName', width: '10%', sortable: false},
            {name: 'visitorCardType.desc', index: 'cardType', width: '7%', sortable: false},
            {name: 'cardNumber', index: 'cardNumber', width: '15%', sortable: false},
            {name: 'visitorStatus.desc', index: 'status', width: '7%', sortable: false},
            {name: 'oper', index: '', width: '10%', sortable: false, formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        viewUrl: viewUrl,
                        viewLabel: '详情',
                        viewColNames: ['visitorCode'],

                        updateUrl: updateUrl,
                        updateLabel: '修改'
                    }
                }
            }
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
        var visitorCode = $('#visitorCode').val();
        var unitCode = $('#unitCode').val();
        if (visitorCode.trim().length > 0 && unitCode.length === 0) {
            bootbox.alert('请选择组织');
            return;
        }

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
        $('#status').trigger('chosen:updated');
    });
});