/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$('#submitForm').validateAce({
    submitHandler: function (f) {
        $.ajax({
            type: 'post',
            url: Env.context + '/alert/updateData.json',
            data: $(f).serialize(),
            dataType: 'json',
            success: function (resp) {
                if (resp.code && resp.code === '200') {
                    bootbox.alert('上报成功', function () {
                        //                        location.href = Env.context + '/dict/list';
                        operCompleted('/alert/list');
                    });

                } else {
                    bootbox.alert('上报失败:' + resp.msg);
                }
            },
            error: function (resp, errq) {
                bootbox.alert('上报失败');
            }
        });
    }
});
enableChosen();
$('#submitBtn').click(function () {
    $('#submitForm').submit();
});

$('#cancelBtn').click(function () {
    undo('/alert/list');
});
