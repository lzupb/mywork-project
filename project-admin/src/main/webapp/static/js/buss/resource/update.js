/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/resource/updateData.json';
    var addJsonUrl = Env.context + '/resource/addData.json';
    var listUrl = Env.context + '/resource/list';
    var roleSuggestUrl = Env.context + '/role/suggest.json';

    enableChosen();

    var saveUrl = addJsonUrl;
    if ($('#id').val()) {
        saveUrl = updateJsonUrl;
    }

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
                url: saveUrl,
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

    $('#roleIdList').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: roleSuggestUrl
    }, {
        processItems: function (resp) {
            return resp.data.rows.map(function (item) {
                return {
                    id: item.id,
                    name: item.label + '[' + item.name + ']'
                };
            });
        },
        keepSelected: true
    });
});

