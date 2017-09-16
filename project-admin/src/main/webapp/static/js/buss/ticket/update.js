/** @file 更新 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,ace,rome,start,end */

$(function () {
    var updateJsonUrl = Env.context + '/ticket/updateData.json';
    var listUrl = Env.context + '/ticket/list';
    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            groupCodes: {
                required: true,
                maxlength: 2000
            }
        },
        submitHandler: function (f) {
            var validator = $('#submitForm').validate();
            var obj = {};

            if (!$('#groupCodes').val()) {
                var propertyName = 'groupCodes';
                var errorMessage = '设备组为必填';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }

            if (!$('#ticketCode').val()) {
                var propertyName = 'ticketCode';
                var errorMessage = '票务code为必填';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }

            if (!$('#orderCode').val()) {
                var propertyName = 'orderCode';
                var errorMessage = '票务订单号为必填';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }

            // var startTime = $('#startTime').val().split(':');
            // var endTime = $('#endTime').val().split(':');
            // if (parseInt(startTime[0], 10) > parseInt(endTime[0], 10)
            //     || (parseInt(startTime[0], 10) === parseInt(endTime[0], 10)
            //     && parseInt(startTime[1], 10) >= parseInt(endTime[1], 10))) {
            //     var propertyName = 'end';
            //     var errorMessage = '开始须早于结束';
            //     obj[propertyName] = errorMessage;
            //     validator.showErrors(obj);
            //     return;
            // }


            $.ajax({
                type: 'post',
                url: updateJsonUrl,
                data: $(f).serialize(),
                dataType: 'json',
                success: function (resp) {
                    if (resp.code && resp.code === 200) {
                        bootbox.alert('保存成功', function () {
                            window.location.href = listUrl;
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

    $('#visitorUucode').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: Env.context + '/visitor/suggestByUUcode.json'
    }, {
        processItems: function (resp) {
            var items = resp.map(function (item) {
                return {
                    id: item.visitorUucode,
                    name: item.visitorCode
                };
            });
            return items;
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
function deleteTicket(event, serviceId) {
    $('#ticket_' + serviceId).remove();
}
