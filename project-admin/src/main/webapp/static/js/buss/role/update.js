/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/role/updateData.json';
    var listUrl = Env.context + '/role/list';

    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            label: {
                required: true,
                regex: /^[\u4e00-\u9fa5_0-9a-zA-Z]{1,30}$/
            },
            name: {
                required: true,
                regex: /^[a-zA-Z]{1,30}$/
            },
            description: {
                required: true
            }
        },
        messages: {
            label: {
                regex: '角色名称不要超过30字符'
            },
            name: {
                regex: '角色code请用英文，小于30字符'
            }
        },
        submitHandler: function (f) {
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


    // 提交表单
    $('#submitBtn').click(function () {
        $('#submitForm').submit();
    });

    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });

    // 全选按钮
    $('.authCheckBox input[type="checkbox"].group').click(function () {
        var isChecked = $(this).is(':checked');
        if (isChecked) {
            $(this).closest('.authCheckBox').find('input[type="checkbox"].item').prop('checked', true);
        } else {
            $(this).closest('.authCheckBox').find('input[type="checkbox"].item').prop('checked', false);
        }
    });

    $('.authCheckBox input[type="checkbox"].item').click(function () {
        var itemSize = 0;
        var itemCheckedSize = 0;
        $(this).closest('.authCheckBox').find('input[type="checkbox"].item').each(function (index, item) {
            itemSize++;
            if ($(item).is(':checked')) {
                itemCheckedSize++;
            }
        });

        if (itemCheckedSize > 0 && itemCheckedSize === itemSize) {
            $(this).closest('.authCheckBox').find('input[type="checkbox"].group').prop('checked', true);
        } else {
            $(this).closest('.authCheckBox').find('input[type="checkbox"].group').prop('checked', false);
        }
    });

    // 初始化
    $('.authCheckBox input[type="checkbox"].group').each(function (i, group) {
        var allCheck = true;
        $(group).closest('.authCheckBox').find('input[type="checkbox"].item').each(function (j, item) {
            var checked = $(item).is(':checked');
            if (!checked) {
                allCheck = false;
                return;
            }
        });

        $(group).prop('checked', allCheck);
    });
});

