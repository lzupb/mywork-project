/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted,btn_choose,btn_change,no_icon */

$(function () {
    var updateJsonUrl = Env.context + '/appfile/updateData.json';
    var listUrl = Env.context + '/appfile/list';
    var getVersionUrl = Env.context + '/appversion/getVersions.json';

    enableChosen();

    $('#appVersion').ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: getVersionUrl
    }, {
        processItems: function (resp) {
            var object = [];
            if (resp.data.rows) {
                for (var i = 0; i < resp.data.rows.length; i++) {
                    object[i] = {};
                    object[i].name = resp.data.rows[i].versionName;
                    object[i].id = resp.data.rows[i].versionValue;
                }
            }
            return object;
        },
        keepSelected: true
    });

    $('#submitForm').validateAce({
        submitHandler: function () {
            $('#submitForm').ajaxSubmit({
                type: 'post',
                url: updateJsonUrl,
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

    $('.ace-file').ace_file_input({
        style: 'well',
        btn_choose: '选择图片',
        btn_change: '选择图片',
        no_icon: 'ace-icon fa fa-cloud-upload',
        allowExt: ['apk'],
        // maxSize: 2 * 1024 * 1024,
        droppable: true,
        thumbnail: 'small'
    }).on('file.error.ace', function () {
        bootbox.alert('文件类型和大小不允许');
    });

});

