/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/dict/getData.json';
    var deleteJsonUrl = Env.context + '/dict/delete.json';
    var updateUrl = Env.context + '/dict/update';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    var dictTypeMap = $.parseJSON($('#dictTypesJsonString').val());
    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['字典名', '字典值', '字典类型', '启用状态', '创建时间', '修改时间', '描述信息', '操作'],
        colModel: [
            {name: 'dictKey', index: 'dictKey'},
            {name: 'dictValue', index: 'dictValue'},
            {
                name: 'dictType', index: 'dictType', formatter: function (value) {
                    var rt = dictTypeMap[value];
                    if (rt) {
                        return rt;
                    }
                    return '';
                }
            },
            {
                name: 'enable', index: 'createdDate', align: 'right', formatter: function (value) {
                    return value === true ? '启用' : '未启用';
                }
            },
            {name: 'createDate', index: 'createDate'},
            {name: 'lastModifiedDate', index: 'lastModifiedDate'},
            {name: 'description', index: 'description'},
            {
                name: 'oper', index: '', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        updateUrl: updateUrl,
                        updateLabel: '修改字典',
                        deleteUrl: deleteJsonUrl,
                        deleteLabel: '删除字典'
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