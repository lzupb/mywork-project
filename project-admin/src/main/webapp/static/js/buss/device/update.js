/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted,Process,JE */

$(function () {
    var updateJsonUrl = Env.context + '/device/updateData.json';
    var listUrl = '/device/list';

    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            deviceName: {
                required: true,
                maxlength: 100
            },
            deviceCode: {
                required: true,
                maxlength: 100
            },
            hardCode: {
                required: true,
                maxlength: 100
            },
            config: {
                required: true,
                maxlength: 3000
            }
        },
        submitHandler: function (f) {
            if ($('#id').val()) {
                $('#unitCode').prop('disabled', false).trigger('chosen:updated');
            }
            var obj = {};
            var validator = $('#submitForm').validate();
            var isRepeat = checkRepeat({
                deviceCode: $('#deviceCode').val()
            });
            if (isRepeat) {
                var propertyName = 'deviceCode';
                var errorMessage = '设备软编码已存在';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }
            isRepeat = checkRepeat({
                deviceName: $('#deviceName').val()
            });
            if (isRepeat) {
                var propertyName = 'deviceName';
                var errorMessage = '名称已存在';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }
            $.ajax({
                type: 'post',
                url: updateJsonUrl,
                data: $(f).serialize(),
                dataType: 'json',
                success: function (resp) {
                    if (resp.code && resp.code === 200) {
                        bootbox.alert('保存成功', function () {
                            operCompleted(listUrl);
                        });

                    } else {
                        bootbox.alert('保存失败:' + resp.msg);
                    }
                },
                error: function (resp) {
                    if (isNotSessionExpired(resp)) {
                        bootbox.alert('保存失败');
                    }
                }
            });
        }
    });
    $('#unitCode').change(function () {
        var groupsSelect = $('#permissionIds');
        groupsSelect.val('');
        var selectDom = groupsSelect[0];
        selectDom.options.length = 0;
        selectDom.options[0] = new Option('', '');
        $('#permissionIds').trigger('chosen:updated');
//        initGroupSelect();
    });
    if ($('#id').val()) {
        $('#unitCode').prop('disabled', true).trigger('chosen:updated');
    }
    // 提交表单
    $('#submitBtn').click(function () {
        $('#submitForm').submit();
    });

    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });
    JE.init('configText');
    $('#formatJson').click(function () {
        JE.format();
    });
    $('#fommatCompact').click(function () {
        JE.format(true);
    });
    initGroupSelect();
});
function initGroupSelect() {
    var getGroupsUrl = Env.context + '/deviceGroup/getGroups';
    $('#permissionIds').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: getGroupsUrl
    }, {
        processItems: function (resp) {
            var object = [];
            if (resp.data.rows) {
                for (var i = 0; i < resp.data.rows.length; i++) {
                    object[i] = {};
                    object[i].name = resp.data.rows[i].groupName;
                    object[i].id = resp.data.rows[i].id;
                }
            }
            return object;
        },
        ajaxDynamicData: function () {
            return {unitCodeMatch: $('#unitCode').val()};
        },
        keepSelected: true
    });
}
function checkRepeat(datas) {
    var findUrl = '/device/find';
    var isRepeat = false;
    $.ajax({
        type: 'post',
        data: datas,
        url: findUrl,
        dataType: 'json',
        async: false,
        success: function (resp) {
            if (resp.code && resp.code === 200) {
                if (resp.data.rows.length > 0) {
                    if ($('#id').val()) {
                        for (var i = 0; i < resp.data.rows.length; i++) {
                            if ($('#id').val() !== (resp.data.rows[i].id + '')) {
                                isRepeat = true;
                            }
                        }
                    } else {
                        isRepeat = true;
                    }
                }
            }
        },
        error: function (resp) {

        }
    });
    return isRepeat;
}