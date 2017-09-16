/** @file 更新 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/visitor/updateData.json';
    var listUrl = Env.context + '/visitor/list';

    enableChosen();

    $.validator.addMethod('fileCheck', function (value, element) {
        if (!$('#id').val()) {
            return value;
        } else {
            return true;
        }
    }, '请添加图片');
    $.validator.addMethod('cardNumberCheck', function (value, element) {
        if ($('input:radio[name=visitorCardType]:checked').val() === 'IdCard') {
            return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
        } else {
            return true;
        }
    }, '身份证号格式不正确');

    $('#submitForm').validateAce({
        rules: {
            cardNumber: {
                cardNumberCheck: true,
                maxlength: 50
            },
            visitorCode: {
                required: true,
                regex: /^\S{1,100}$/
            },
            photonew: 'fileCheck'
        },
        messages: {
            cardNumber: {
                maxlength: '证件号不要超过50字符'
            },
            visitorCode: {
                regex: '限制100字符'
            }
        },
        submitHandler: function () {
            $('#submitForm').ajaxSubmit({
                type: 'post',
                url: updateJsonUrl,
                beforeSubmit: function () {
                    $('#submitBtn').attr('disabled', 'disabled');
                },
                success: function (resp) {
                    $('#submitBtn').removeAttr('disabled');
                    if (resp.code && resp.code === 200) {
                        bootbox.alert('保存成功', function () {
                            operCompleted(listUrl);
                        });

                    } else {
                        bootbox.alert('保存失败:' + resp.msg);
                    }
                },
                error: function (resp) {
                    $('#submitBtn').removeAttr('disabled');
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
        allowExt: ['jpeg', 'jpg', 'png', 'gif', 'bmp'],
        maxSize: 2 * 1024 * 1024,
        droppable: true,
        thumbnail: 'small'
    }).on('file.error.ace', function () {
        bootbox.alert('图片不合格');
    });

    // 简单初始化
    if (!$('input:radio[name=visitorCardType]:checked').val()) {
        $('input:radio[name=visitorCardType]').first().attr('checked', true);
    }
});

