/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/appversion/getData.json';
    var deleteJsonUrl = Env.context + '/appversion/delete.json';
    var updateUrl = Env.context + '/appversion/update';


    // 启用jqGrid自适应大小
    enableChosen();
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['id', '版本', '版本名称', '状态', '密钥', '操作'],
        colModel: [
            {name: 'id', index: 'id', sortable: false},
            {name: 'versionValue', index: 'versionValue', sortable: false},
            {name: 'versionName', index: 'versionName', sortable: false},
            {name: 'status.desc', index: 'status', sortable: false},
            {name: 'encryptionKey', index: 'encryptionKey', sortable: false},
            {
                name: 'oper', index: '', width: '60px', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        deleteUrl: deleteJsonUrl,
                        deleteLabel: '删除',
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