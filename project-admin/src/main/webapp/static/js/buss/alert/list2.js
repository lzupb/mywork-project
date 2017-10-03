/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/alert/getData.json';
    var deleteJsonUrl = Env.context + '/alert/delete.json';
    var updateUrl = Env.context + '/alert/update';
    var batchUpdateUrl = Env.context + '/alert/batchUpdateData.json';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['id', 'PORT_NUM', 'OBJECT_CLASS', 'INT_ID', 'NE_LABEL', 'PROBABLE_CAUSE', 'ALARM_TITLE_TEXT',
            'EVENT_TIME', 'CANCEL_TIME', 'VENDOR_NAME', 'REGION_NAME', '操作'],
        colModel: [
            {name: 'id', index: 'id', hidden: true},
            {name: 'portNum', index: 'portNum'},
            {name: 'objectClass', index: 'objectClass'},
            {name: 'intId', index: 'intId'},
            {name: 'neLabel', index: 'neLabel'},
            {name: 'probableCause', index: 'probableCause'},
            {name: 'alarmTitleText', index: 'alarmTitleText'},
            {name: 'eventTime', index: 'eventTime'},
            {name: 'cancelTime', index: 'cancelTime'},
            {name: 'vendorName', index: 'vendorName'},
            {name: 'regionName', index: 'regionName'},
            {
                name: 'oper', index: '', sortable: false,
                formatter: 'operateFormat',
                formatoptions: {
                    settings: {
                        updateUrl: updateUrl,
                        updateLabel: '修改上报',
                        deleteUrl: deleteJsonUrl,
                        deleteTipMessage: "确定要清空选中的本地记录?",
                        deleteLabel: '清空本地记录'
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
        multiselect: true,//复选框
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

    $('#batch_modify').on('click', function () {
        //获取多选到的id集合
        var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");
        //遍历访问这个集合
        if (ids.length == 0) {
            bootbox.alert("必须至少选择一条记录！");
            return;
        }
        //$(ids).each(function (index, id) {
        //    //由id获得对应数据行
        //    var row = $("#grid-table").jqGrid('getRowData', id);
        //    alert("row.id:" + row.id);
        //})
        bootbox.dialog({
            title : "批量上报",
            message : "" +
                "<div class='well ' style='margin-top:25px;'>" +
                "<form class='form-horizontal' role='form'>" +
                "<div class='form-group'>" +
                "<label class='col-sm-3 control-label no-padding-right' for='txtOldPwd'>calcel_time</label>" +
                "<div class='col-sm-9'>" +
                "<input required style='height:30px;max-width:165px;' id='cancelTime' name='cancelTime' type='text' onFocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/>" +
                "</div></div><div class='space-4'></div>" +
                "</form></div>",
            buttons : {
                "success" : {
                    "label" : "<i class='icon-ok'></i> 上报",
                    "className" : "btn-sm btn-success",
                    "callback" : function() {
                        var cancelTime = $("#cancelTime").val();
                        if(cancelTime == ""){
                            bootbox.alert("calcel_time不能为空");
                            return false;
                        }
                        var info = {"alarmIds":ids,"cancelTime":cancelTime};

                        $.ajax({
                            type: 'post',
                            url: batchUpdateUrl,
                            data: JSON.stringify(info),
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (resp) {
                                if (resp.code && resp.code === '200') {
                                    bootbox.alert('批量上报成功');
                                } else {
                                    bootbox.alert('批量上报失败:' + resp.msg);
                                }
                            },
                            error: function (resp, errq) {
                                bootbox.alert('批量上报失败');
                            }
                        });

                        //$.post(batchUpdateUrl,info,function(data){
                        //    bootbox.alert("批量上报成功");
                        //},'json');
                    }
                },
                "cancel" : {
                    "label" : "<i class='icon-info'></i> 取消",
                    "className" : "btn-sm btn-danger",
                    "callback" : function() { }
                }
            }
        });
    });
});