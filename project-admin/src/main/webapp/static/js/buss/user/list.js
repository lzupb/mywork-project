/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/user/getData.json';
    var deleteJsonUrl = Env.context + '/user/delete.json';
    var updateUrl = Env.context + '/user/update';


    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['登录名', '用户名', '员工编号', '身份证', '电话', '状态', '角色', '操作', 'id'],
        colModel: [
            {name: 'loginName', index: 'loginName', sortable: false},
            {name: 'username', index: 'username', sortable: false},
            {name: 'employeeId', index: 'employeeId', sortable: false},
            {name: 'cardId', index: 'cardId', sortable: false},
            {name: 'phone', index: 'phone', sortable: false},
            {
                name: 'status', index: 'status', sortable: false,
                formatter: function (cell, options, row) {
                    var text = cell === 'True' ? '有效' : '无效';
                    var color = cell === 'True' ? 'green' : 'red';
                    return '<span style="color:' + color + '">' + text + '</span>';
                }
            },
            {
                name: 'roles', index: 'roles', sortable: false,
                formatter: function (cell, options, row) {
                    return cell.map(function (item) {
                        return item.label;
                    }).join();
                }
            },
            {
                name: 'oper', index: '', width: '160px', sortable: false,
                // formatter: 'operate',
                // formatoptions: {
                //    opr: [
                //        {
                //            url: deleteJsonUrl,
                //            onclick:'onclick',
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
                        deleteLabel: '删除员工',
                        updateUrl: updateUrl,
                        updateLabel: '修改员工'
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