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

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        height: 'auto',
        mtype: 'POST',
        colNames: ['字典名', '字典值', '启用状态', '创建时间', '修改时间', '描述信息', '操作'],
        colModel: [
            {name: 'dictKey', index: 'dictKey'},
            {name: 'dictValue', index: 'dictValue'},
            {
                name: 'enable', index: 'enable', align: 'right', formatter: function (value) {
                    return value === true ? '启用' : '未启用';
                }
            },
            {name: 'createdDate', index: 'createdDate'},
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

    $('#test_dialog').on('click', function () {
        bootbox.dialog({
            title : "修改密码",
            message : "<div class='well ' style='margin-top:25px;'><form class='form-horizontal' role='form'><div class='form-group'><label class='col-sm-3 control-label no-padding-right' for='txtOldPwd'>旧密码</label><div class='col-sm-9'><input type='text' id='txtOldPwd' placeholder='请输入旧密码' class='col-xs-10 col-sm-5' /></div></div><div class='space-4'></div><div class='form-group'><label class='col-sm-3 control-label no-padding-right' for='txtNewPwd1'>新密码</label><div class='col-sm-9'><input type='text' id='txtNewPwd1' placeholder='请输入新密码' class='col-xs-10 col-sm-5' /></div></div><div class='space-4'></div><div class='form-group'><label class='col-sm-3 control-label no-padding-right' for='txtNewPwd2'>确认新密码</label><div class='col-sm-9'><input type='text' id='txtNewPwd2' placeholder='再次输入新密码' class='col-xs-10 col-sm-5' /></div></div></form></div>",
            buttons : {
                "success" : {
                    "label" : "<i class='icon-ok'></i> 保存",
                    "className" : "btn-sm btn-success",
                    "callback" : function() {
                        var txt1 = $("#txtOldPwd").val();
                        var txt2 = $("#txtNewPwd1").val();
                        var txt3 = $("#txtNewPwd2").val();

                        if(txt1 == "" || txt2 == "" || txt3 == ""){
                            bootbox.alert("密码不能为空");
                            return false;
                        }
                        if(txt2 != txt3 ){
                            bootbox.alert("两次输入新密码不一致，请重新输入!");
                            return false;
                        }
                        var info = {"opt":"changepassword","oldpwd":txt1,"newpwd1":txt2,"newpwd2":txt3};
                        //$.post("../CommonServlet",info,function(data){
                        bootbox.alert("密码更新成功");
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
    })
});