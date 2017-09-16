/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/deviceGroup/updateData.json';
    var listUrl = '/deviceGroup/list';

    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            groupName: {
                required: true,
                maxlength: 100
            },
            groupCode: {
                required: true,
                maxlength: 100
            }
        },
        submitHandler: function (f) {
            if ($('#id').val()) {
                $('#unitCode').prop('disabled', false).trigger('chosen:updated');
            }
            var obj = {};
            var validator = $('#submitForm').validate();
            var isRepeat = checkRepeat({
                groupCode: $('#groupCode').val()
            });
            if (isRepeat) {
                var propertyName = 'groupCode';
                var errorMessage = '编码已存在';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }
            isRepeat = checkRepeat({
                groupName: $('#groupName').val()
            });
            if (isRepeat) {
                var propertyName = 'groupName';
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
});
function checkRepeat(datas) {
    var findUrl = '/deviceGroup/find';
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