/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/alert/getData.json';
    var deleteJsonUrl = Env.context + '/alert/delete.json';
    var updateUrl = Env.context + '/alert/update';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['PORT_NUM', 'OBJECT_CLASS', 'INT_ID', 'NE_LABEL', 'PROBABLE_CAUSE', 'ALARM_TITLE_TEXT',
            'EVENT_TIME', 'CANCEL_TIME', 'VENDOR_NAME', 'REGION_NAME', '操作'],
        colModel: [
            {name: 'PORT_NUM', index: 'PORT_NUM'},
            {name: 'OBJECT_CLASS', index: 'OBJECT_CLASS'},
            {name: 'INT_ID', index: 'INT_ID'},
            {name: 'NE_LABEL', index: 'NE_LABEL'},
            {name: 'PROBABLE_CAUSE', index: 'PROBABLE_CAUSE'},
            {name: 'ALARM_TITLE_TEXT', index: 'ALARM_TITLE_TEXT'},
            {name: 'EVENT_TIME', index: 'EVENT_TIME'},
            {name: 'CANCEL_TIME', index: 'CANCEL_TIME'},
            {name: 'VENDOR_NAME', index: 'VENDOR_NAME'},
            {name: 'REGION_NAME', index: 'REGION_NAME'},
            {
                name: 'oper', index: '', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        updateUrl: updateUrl,
                        updateLabel: '修改',
                        deleteUrl: deleteJsonUrl,
                        deleteLabel: '删除'
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