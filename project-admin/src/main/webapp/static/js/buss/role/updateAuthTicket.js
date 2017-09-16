/** @file 列表 */
/* globals CONS,Env,enableChosen,bootbox,isNotSessionExpired,undo,operCompleted */

$(function () {
    var updateAuthTicketJsonUrl = Env.context + '/role/updateAuthTicketData.json';
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
                url: updateAuthTicketJsonUrl,
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
            $('#ticketIds').children().each(function () {
                tmp[tmp.length] = this.value;
            });
            $('#ticketIds').val(tmp).trigger('change').trigger('chosen:updated');
        } else {
            var tmp = [];
            $('#ticketIds').val(tmp).trigger('change').trigger('chosen:updated');
        }
    });

    $('#ticketIds').change(initAllCheck);

    function initAllCheck() {
        var res = $('#ticketIds').val();
        if (res) {
            if (res.length === $('#ticketIds').children().length) {
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