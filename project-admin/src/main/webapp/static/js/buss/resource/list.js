/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/resource/getData.json';
    var deleteJsonUrl = Env.context + '/resource/delete.json';
    var updateUrl = Env.context + '/resource/update';


    // 启用jqGrid自适应大小
    enableChosen();
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['资源类别', '资源名称', '路径(资源标示)', '角色', '操作', 'id'],
        colModel: [
            {name: 'authGroup', index: 'authGroup', sortable: false},
            {name: 'authName', index: 'authName', sortable: false},
            {name: 'path', index: 'path', sortable: false},
            {
                name: 'resourceRoles', index: 'resourceRoles', sortable: false,
                formatter: function (cell, options, row) {
                    return cell.map(function (item) {
                        return item.roleCode;
                    }).join();
                }
            },
            {
                name: 'oper', index: '', width: '60px', sortable: false,
                // formatter: 'operate',
                // formatoptions: {
                //    opr: [
                //        {
                //            url: deleteJsonUrl,
                //            onclick: 'onclick',
                //            data: function (row) {
                //                return {
                //                    "a": row.id
                //                }
                //            },
                //            name: '删除员工'
                //        },
                //        {
                //            url: updateUrl,
                //            name: '修改员工'
                //        }
                //    ]
                // }
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