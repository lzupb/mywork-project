/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/appversion/updateData.json';
    var listUrl = Env.context + '/appversion/list';
    var genKeyUrl = Env.context + '/appversion/genKey.json';

    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            authName: {
                required: true
            },
            path: {
                required: true
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

    // 生成密钥
    $('#genKey').click(function () {
        $.ajax({
            type: 'post',
            url: genKeyUrl,
            success: function (resp) {
                if (resp.code && resp.code === 200) {
                    $('#encryptionKey').val(resp.custom);
                } else {
                    bootbox.alert('生成密钥失败:' + resp.msg);
                }
            },
            error: function (resp) {
                if (isNotSessionExpired(resp)) {
                    bootbox.alert('生成密钥失败');
                }
            }
        });
    });

    // 提交表单
    $('#submitBtn').click(function () {
        $('#submitForm').submit();
    });

    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });

});

