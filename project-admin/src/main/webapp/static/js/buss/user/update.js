/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/user/updateData.json';
    var listUrl = Env.context + '/user/list';
    var checkNameUrl = Env.context + '/user/checkLoginName.json';
    var roleSuggestUrl = Env.context + '/role/suggest.json';

    enableChosen();

    var reg = /^[a-zA-Z\d`~!@#\$%\^&\*\(\)\-_=\+\[\{\]\}\\\|;:'",<\.>/\?]{1,30}$/;

    $('#submitForm').validateAce({
        rules: {
            loginName: {
                required: true,
                regex: reg,
                remote: {
                    url: checkNameUrl, // 后台处理程序
                    type: 'post',               // 数据发送方式
                    dataType: 'json',           // 接受数据格式
                    data: {                     // 要传递的数据
                        loginName: function () {
                            return $('#loginName').val();
                        },
                        id: function () {
                            return $('#id').val();
                        },
                        scenicId: function () {
                            return $('#scenicId').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                regex: reg
            },
            username: {
                required: true,
                regex: /^[\u4e00-\u9fa5_a-zA-Z]{1,10}$/
            },
            phone: {
                mobile: true
            },
            cardId: {
                regex: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
            }
        },
        messages: {
            loginName: {
                regex: '登录名必须是数字、字母、符号组合，30字以内',
                remote: '登录名重复'
            },
            password: {
                regex: '密码必须是数字、字母、符号组合，30字以内'
            },
            username: {
                regex: '限中英文，不可为标点符号限制10字'
            },
            cardId: {
                regex: '身份证号格式不正确'
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

    // select2
    // $('#roleIdList').select2({
    //    allowClear: true,
    //    width: '100%',
    //    multiple: true,
    //    minimumInputLength: 2,
    //    ajax: {
    //        url: roleListUrl,
    //        dataType: 'json',
    //        delay: 250,
    //        data: function (params) {
    //            return {
    //                q: params.term, // search term
    //                page: params.page
    //            };
    //        },
    //        processResults: function (resp, params) {
    //            var data = resp.data;
    //            var items = data.rows.map(function (val) {
    //                return {
    //                    id: val.id,
    //                    text: val.name
    //                };
    //            });
    //            params.page = params.page || 1;
    //            return {
    //                results: items,
    //                pagination: {
    //                    more: params.page < data.total
    //                }
    //            };
    //        },
    //        cache: true
    //    }
    // });

    // $('#roleIdList').ajaxChosen({
    //    dataType: 'json',
    //    type: 'POST',
    //    url: roleSuggestUrl
    // }, {
    //    processItems: function (resp) {
    //        return resp.ajaxResponse.data.rows.map(function (item) {
    //            return {
    //                id: item.id,
    //                name: item.label + '[' + item.name + ']'
    //            };
    //        });
    //    }
    // });
});

