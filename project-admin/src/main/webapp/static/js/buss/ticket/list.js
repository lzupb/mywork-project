/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/ticket/getData.json';
    var deleteJsonUrl = Env.context + '/ticket/delete.json';
    var updateUrl = Env.context + '/ticket/update';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['票务code', '票订单号', 'unit_code', '游客UUCode', '权限组编号', '开始时间', '结束时间', '操作', 'id'],
        colModel: [{
            name: 'ticketCode',
            index: 'ticketCode',
            width: '10%',
            sortable: false,
            formatter: function (cellval, opts, rowData) {
                return '<a href="/ticket/view?id=' + rowData.id + '" target="_blank">' + rowData.ticketCode + '</a>';
            }
        }, {
            name: 'orderCode',
            index: 'orderCode',
            sortable: false,
            width: '10%'
        }, {
            name: 'unitCode',
            index: 'unitCode',
            sortable: false,
            width: '10%'
        }, {
            name: 'visitorUucode',
            index: 'visitorUucode',
            sortable: false,
            width: '10%',
            formatter: function (cellval, opts, rowData) {
                return '<a href="/visitor/view?visitorUucode=' + rowData.visitorUucode + '" target="_blank">'
                    + rowData.visitorUucode + '</a>';
            }
        }, {
            name: 'groupCodes',
            index: 'groupCodes',
            width: '15%',
            sortable: false
        }, {
            name: 'startTime',
            index: 'startTime',
            width: '14%',
            sortable: false
        }, {
            name: 'endTime',
            index: 'endTime',
            width: '14%',
            sortable: false
        }, {
            name: 'oper',
            index: '',
            width: '100px',
            width: '15%',
            sortable: false,
            // 修改、刪除
            formatter: function (cellval, opts, rowData) {
                var oper = '<div class="action-buttons center">';

                oper += '<a href="#" title="修改票务" onclick="updateHandler(\'' + rowData.id + '\',\''
                    + opts.gid + '\')" class="blue">修改票务</a>';
                oper += '<span class="vbar"></span>';
                oper += '<a class="red" href="#" title="删除票务" onclick="delHandler(\'' + rowData.id + '\',\''
                    + rowData.setsNum
                    + '\',\'' + rowData.equipmentNum + '\',\'' + opts.gid
                    + '\')" class="blue">删除票务</a>';
                oper += '<span class="vbar"></span>';
                oper += '</div>';
                return oper;
            }
        }, {
            name: 'id',
            index: 'id',
            hidden: true
        }],
        autowith: true,
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30, 50, 100],
        pager: pagerSelector,
        altRows: true,
        // sortname: 'createTime_desc',
        jsonReader: jqgridCommons.jsonReader,
        // multiselect: true,
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
    });
});
function updateHandler(id, gid) {
    var updateHandler = Env.context + '/ticket/update';
    var newUrl = updateHandler + '?' + decodeURIComponent($.param({id: id}), true);
    window.open(newUrl, '_blank');
}
function delHandler(id, setsNum, equipmentNum, gid) {

    bootbox.dialog({
        message: '请确定是否删除记录',
        buttons: {
            confirm: {
                label: '确定',
                className: 'btn-danger',
                callback: function () {
                    $.ajax({
                        type: 'post',
                        url: Env.context + '/ticket/delete.json',
                        data: {id: id},
                        dataType: 'json',
                        success: function (resp) {
                            if (resp.code && resp.code === 200) {
                                var gridTable = $('#' + gid);
                                gridTable.trigger('reloadGrid');
                                // 刷新表格
                                bootbox.alert('删除成功');
                            } else {
                                bootbox.alert(resp.msg);
                            }
                        },
                        error: function (resp, errq) {
                            bootbox.alert('操作失败');
                        }
                    });
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
}