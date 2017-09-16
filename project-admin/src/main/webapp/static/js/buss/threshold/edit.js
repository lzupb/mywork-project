/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$('#submitForm').validateAce({
    submitHandler: function (f) {
        $.ajax({
            type: 'post',
            url: Env.context + '/threshold/updateData.json',
            data: $(f).serialize(),
            dataType: 'json',
            success: function (resp) {
                if (resp.code && resp.code === 200) {
                    bootbox.alert('保存成功');
                } else {
                    bootbox.alert('保存失败:' + resp.msg);
                }
            },
            error: function (resp, errq) {
                bootbox.alert('保存失败');
            }
        });
    }
});
enableChosen();
$('#submitBtn').click(function () {
    $('#submitForm').submit();
});
