/** @file 列表 */
/* globals CONS,Env,enableChosen,bootbox,isNotSessionExpired,undo,operCompleted */

$(function () {
    var userSuggestUrl = Env.context + '/user/suggest.json';
    var listUrl = Env.context + '/user/list';
    var addUserJsonUrl = Env.context + '/role/addUser.json';

    enableChosen();

    $('#userList').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: userSuggestUrl
    }, {
        processItems: function (resp) {
            return resp.data.rows.map(function (item) {
                return {
                    id: item.id,
                    name: item.username + '[' + item.loginName + ']'
                };
            });
        },
        keepSelected: true
    });

    $('#submitForm').validateAce({
        rules: {
            roleId: {
                required: true
            },
            userList: {
                required: true
            }
        },
        submitHandler: function (f) {
            $.ajax({
                type: 'post',
                url: addUserJsonUrl,
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