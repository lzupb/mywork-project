/** @file login */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var loginProcessUrl = Env.context + '/loginProcess';
    var successUrl = Env.context + '/';
    // 登录
    $('#loginForm').validateAce({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: '用户名必填'
            },
            password: {
                required: '密码必填'
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest('label'));
        },
        submitHandler: function (f) {
            $.ajax({
                type: 'post',
                url: loginProcessUrl,
                data: $(f).serialize(),
                dataType: 'json',
                success: function (resp) {
                    if (resp.code && resp.code === 200) {
                        if (resp.targetUrl) {
                            location.href = resp.targetUrl;
                        } else {
                            location.href = successUrl;
                        }
                    } else {
                        bootbox.alert(resp.msg);
                    }
                },
                error: function (resp) {
                    if (resp.responseJSON.code === 401) {
                        bootbox.alert('用户名或密码不正确，请重新输入');
                    } else {
                        bootbox.alert('操作失败');
                    }
                }
            });
        }
    });

    $('#loginBtn').click(function () {
        $('#loginForm').submit();
    });

    // 响应回车事件
    $(document).on('keypress', 'input', function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            $('#loginBtn').click();
        }
    });
});