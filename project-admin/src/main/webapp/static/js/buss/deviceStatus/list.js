/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons,bootbox,isNotSessionExpired */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/deviceStatus/getData.json';
    var deleteJsonUrl = Env.context + '/deviceStatus/delete.json';
    var updateUrl = Env.context + '/deviceStatus/updateData';


    // 启用jqGrid自适应大小
    enableChosen();
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['设备名称', '设备状态', '当前命令', '当前app版本', '工作开始时间', '工作结束时间', 'id'],
        colModel: [
            {name: 'deviceName', index: 'deviceName', sortable: false,
                formatter: function (cellval, opts, rowData) {
                    if (rowData.device) {
                        return rowData.device.deviceName;
                    } else {
                        return '';
                    }
                }},
            {name: 'deviceStatus', index: 'deviceStatus', sortable: false},
            {name: 'deviceEvent', index: 'deviceEvent', sortable: false},
            {name: 'currentVersion', index: 'currentVersion', sortable: false},
            {name: 'workBegin', index: 'workBegin', sortable: false},
            {name: 'workEnd', index: 'workEnd', sortable: false},
            {name: 'id', index: 'id', hidden: true}
        ],
        autowith: true,
        viewrecords: true,
        multiselect: true,
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
    $('#changeGroups').on('click', function (event) {
        var ids = $('#grid-table').jqGrid('getGridParam', 'selarrrow');
        if (!ids || ids.length === 0) {
            bootbox.alert('请选择设备');
            event.stopPropagation();
            return;
        }
    });
    $('#modal-form').on('shown.bs.modal', function () {
        $('.selectVersionDiv').hide();
        $('#commond').change(function () {
            if (this.value === 'update') {
                $('.selectVersionDiv').show();
            } else {
                $('.selectVersionDiv').hide();
            }
        });
    });
    $('.ticketsSelectOk').on('click', function (event) {
        var ids = $('#grid-table').jqGrid('getGridParam', 'selarrrow');
        var commond = $('#commond').val();
        if (!commond) {
            bootbox.alert('请选择指令');
            return;
        }
        var didStr = '';
        for (var n = 0; n < ids.length; n++) {
            didStr += ids[n];
            if (n < ids.length - 1) {
                didStr += ',';
            }
        }
        var version = '';
        if (commond === 'update') {
            version = $('#version').val();
            if (!version) {
                bootbox.alert('请选择版本');
                return;
            }
        }
        $.ajax({
            type: 'post',
            url: updateUrl,
            data: {ids: didStr, commond: commond, version: version},
            dataType: 'json',
            success: function (resp) {
                if (resp.code && resp.code === 200) {
                    var gridTable = $('#grid-table');
                    gridTable.trigger('reloadGrid');
                    bootbox.alert('保存成功');
                    $('#modal-form').hide();
                } else {
                    bootbox.alert(resp.message);
                }
            },
            error: function (resp, errq) {
                if (isNotSessionExpired(resp)) {
                    bootbox.alert('操作失败');
                }
            }
        });
    });
});