/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/unit/getData.json';
    var deleteJsonUrl = Env.context + '/unit/delete.json';
    var updateUrl = Env.context + '/unit/update';


    // 启用jqGrid自适应大小
    enableChosen();
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['名称', '父级组织', '组织编码', '操作', 'id'],
        colModel: [
            {name: 'name', index: 'name', sortable: false},
            {name: 'parentName', index: 'parentName', sortable: false},
            {name: 'unitCode', index: 'unitCode', sortable: false},
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
});