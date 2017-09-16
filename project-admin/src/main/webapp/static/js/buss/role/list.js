/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,updatePagerIcons,jqgridCommons,bootbox,isNotSessionExpired */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/role/getData.json';
    var updateUrl = Env.context + '/role/update';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['权限名称', '权限描述', '操作', 'id'],
        colModel: [
            {name: 'label', index: 'label', sortable: false},
            {
                name: 'name', index: 'name', sortable: false,
                formatter: function (cell, options, row) {
                    return '[' + row.name + ']' + row.description;
                }
            },
            {
                name: 'oper', index: '', width: '180px', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        updateUrl: updateUrl,
                        updateLabel: '修改权限'
                    }
                }
            },
            {name: 'id', index: 'id', hidden: true,
                formatter: function (cell, options, row) {
                    return row.name;
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