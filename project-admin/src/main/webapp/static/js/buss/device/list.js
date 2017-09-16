/** @file 列表 */
/* globals CONS,Env,enableChosen,enableJqGridAutoResize,moment,updatePagerIcons,jqgridCommons,bootbox,isNotSessionExpired */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/device/getData.json';
    var deleteJsonUrl = Env.context + '/device/delete.json';
    var updateUrl = Env.context + '/device/update';
    var getGroupsUrl = Env.context + '/deviceGroup/getGroups';
    var batchUpdateUrl = Env.context + '/device/batchUpdate';


    // 启用jqGrid自适应大小
    enableChosen();
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['名称', 'APP编码', '组织编码', '硬件编码', '位置', '激活时间', '设备创建时间', '操作', 'id'],
        colModel: [
            {name: 'deviceName', index: 'deviceName', sortable: false},
            {name: 'deviceCode', index: 'deviceCode', sortable: false},
            {name: 'unitCode', index: 'unitCode', sortable: false},
            {name: 'hardCode', index: 'hardCode', sortable: false},
            {name: 'position', index: 'position', sortable: false},
            {name: 'firstActivateTime', index: 'firstActivateTime', sortable: false},
            {name: 'createTime', index: 'createTime', sortable: false},
            {
                name: 'oper', index: '', sortable: false,
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
        var reqData = $('#search-form').serializeJSON();
        reqData.permissionIds = '';
        var dgis = $('#deviceGroupIds').val();
        if (dgis) {
            for (var i = 0; i < dgis.length; i ++) {
                reqData.permissionIds += dgis[i];
                if (i < dgis.length - 1) {
                    reqData.permissionIds += ',';
                }
            }
        }
        $(gridSelector).setGridParam({postData: null});
        $(gridSelector).jqGrid('setGridParam', {
            datatype: 'json',
            postData: reqData,
            page: 1
        }).trigger('reloadGrid'); // 重新载入
    });

    // reset
    $('.cancel-form-btn').on('click', function () {
        var sform = $('#search-form');
        sform.find('select').val('').trigger('chosen:updated');
        sform[0].reset();
    });
    $('#switch-field-1').click(function () {
        if (this.checked) {
            var tmp = [];
            $('#permissionIds').children().each(function () {
                tmp[tmp.length] = this.value;
            });
            $('#permissionIds').val(tmp).trigger('change').trigger('chosen:updated');
        } else {
            var tmp = [];
            $('#permissionIds').val(tmp).trigger('change').trigger('chosen:updated');
        }
    });
    $('#changeGroups').on('click', function (event) {
        var ids = $('#grid-table').jqGrid('getGridParam', 'selarrrow');
        if (!ids || ids.length === 0) {
            bootbox.alert('请选择设备');
            event.stopPropagation();
            return;
        }
        var unitCode = '';
        for (var n = 0; n < ids.length; n++) {
            var rowdata = $('#grid-table').getRowData(ids[n]);
            if (!unitCode) {
                unitCode = rowdata.unitCode;
            } else {
                if (unitCode !== rowdata.unitCode) {
                    bootbox.alert('请选择相同公司的设备');
                    event.stopPropagation();
                    return;
                }
            }
        }
    });
    $('#modal-form').on('shown.bs.modal', function () {
        var groupsSelect = $('#permissionIds');
        groupsSelect.val('');
        var selectDom = groupsSelect[0];
        selectDom.options.length = 0;
        selectDom.options[0] = new Option('', '');
        $('#permissionIds').trigger('chosen:updated');
    });

    $('#permissionIds').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: getGroupsUrl
    }, {
        processItems: function (resp) {
            return resp.data.rows.map(function (item) {
                return {
                    id: item.id,
                    name: item.groupName
                };
            });
        },
        ajaxDynamicData: function () {
            return {unitCodeMatch: function () {
                var uc = '';
                var ids = $('#grid-table').jqGrid('getGridParam', 'selarrrow');
                for (var n = 0; n < ids.length; n++) {
                    var rowdata = $('#grid-table').getRowData(ids[n]);
                    if (!uc) {
                        uc = rowdata.unitCode;
                        break;
                    }
                }
                return uc;
            }};
        },
        keepSelected: true
    });
    $('#permissionIds').change(function () {
        var res = $('#permissionIds').val();
        if (res) {
            if (res.length === $('#permissionIds').children().length) {
                $('#switch-field-1').prop('checked', true);
            } else {
                $('#switch-field-1').prop('checked', false);
            }
        } else {
            $('#switch-field-1').prop('checked', false);
        }
    });
    $('.ticketsSelectOk').on('click', function (event) {
        var ids = $('#grid-table').jqGrid('getGridParam', 'selarrrow');
        var groupselect = $('#permissionIds').val();
        if (!groupselect) {
            bootbox.alert('请选择设备组');
            return;
        }
        var deviceidStr = '';
        for (var n = 0; n < ids.length; n++) {
            var rowdata = $('#grid-table').getRowData(ids[n]);
            deviceidStr += ids[n];
            if (n < ids.length - 1) {
                deviceidStr += ',';
            }
        }
        var groupidStr = '';
        for (var n = 0; n < groupselect.length; n++) {
            groupidStr += groupselect[n];
            if (n < groupselect.length - 1) {
                groupidStr += ',';
            }
        }
        $.ajax({
            type: 'post',
            url: batchUpdateUrl,
            data: {groupIds: groupidStr, deviceIds: deviceidStr},
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