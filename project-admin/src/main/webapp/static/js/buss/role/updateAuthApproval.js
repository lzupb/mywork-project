/** @file 列表 */
/* globals CONS,Env,enableChosen,bootbox,isNotSessionExpired,undo,operCompleted */

$(function () {
    var updateAuthApprovalJsonUrl = Env.context + '/role/updateAuthApprovalData.json';
    var listUrl = Env.context + '/role/list';

    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            roleId: {
                required: true
            }
        },
        submitHandler: function (f) {
            $.ajax({
                type: 'post',
                url: updateAuthApprovalJsonUrl,
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

    // all check
    $('#allCheckBtn').click(function () {
        if (this.checked) {
            var tmp = [];
            $('#onlineTicketIds').children().each(function () {
                tmp[tmp.length] = this.value;
            });
            $('#onlineTicketIds').val(tmp).trigger('change').trigger('chosen:updated');
        } else {
            var tmp = [];
            $('#onlineTicketIds').val(tmp).trigger('change').trigger('chosen:updated');
        }
    });

    $('#onlineTicketIds').change(initAllCheck);

    function initAllCheck() {
        var res = $('#onlineTicketIds').val();
        if (res) {
            if (res.length === $('#onlineTicketIds').children().length) {
                $('#allCheckBtn').prop('checked', true);
            } else {
                $('#allCheckBtn').prop('checked', false);
            }
        } else {
            $('#allCheckBtn').prop('checked', false);
        }
    }

    initAllCheck();
});