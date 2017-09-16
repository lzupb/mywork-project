/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted,Process,JE */

$(function () {
    var updateJsonUrl = Env.context + '/unitGrant/updateData.json';
    var listUrl = '/unitGrant/list';
    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            grantor: {
                required: true
            },
            grantee: {
                required: true
            }
        },
        submitHandler: function (f) {
            var obj = {};
            var validator = $('#submitForm').validate();
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
});