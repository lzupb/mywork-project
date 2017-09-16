/** @file 更新 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    var updateJsonUrl = Env.context + '/ticket/addData.json';
    var listUrl = Env.context + '/ticket/list';
    var searchUrl = Env.context + '/ticket/searchVisitor';

    enableChosen();

    $.validator.addMethod('fileCheck', function (value, element) {
        if (!$('#imgUrl').attr('src')) {
            return value;
        } else {
            return true;
        }
    }, '请添加图片');
    $.validator.addMethod('cardIdCheck', function (value, element) {
        if ($('#cardType').val() === 'IdCard') {
            return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value);
        } else {
            return true;
        }
    }, '身份证号格式不正确');


    $('#submitForm').validateAce({
        rules: {
            unitCode: {
                required: true,
                maxlength: 50
            },
            cardNumber: {
                required: true,
                maxlength: 50
            },
            visitorId: {
                required: true,
                maxlength: 50
            },
            orderCode: {
                required: true,
                maxlength: 50
            },
            ticketId: {
                required: true,
                regex: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,50}$/
            },
            newphoto: 'fileCheck'
        },
        messages: {
            cardNumber: {
                maxlength: '证件号不要超过50字符'
            },
            orderCode: {
                regex: '限中英文，不可为标点符号限制50字'
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
                            // operCompleted(listUrl);
                            location.href = listUrl;
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


    // TODO
    // $('#unitCode').change(function () {
    //     var groupsSelect = $('#permissionIds');
    //     groupsSelect.val('');
    //     var selectDom = groupsSelect[0];
    //     selectDom.options.length = 0;
    //     selectDom.options[0] = new Option('', '');
    //     $('#permissionIds').trigger('chosen:updated');
    //     getGroups();
    // });

    function getGroups() {
        var getGroupsUrl = Env.context + '/deviceGroup/getGroups';
        $.ajax({
            type: 'post',
            data: {unitCode: $('#unitCode').val()},
            url: getGroupsUrl,
            dataType: 'json',
            async: false,
            success: function (resp) {
                if (resp.code && resp.code === '200') {
                    var selectId = document.getElementsByName("permissionIds");
                    for(var i = 0; i < resp.content.length; i ++){
                        var op = document.createElement("option");

                        op = $("<option>").val(resp.content[i].groupCode).text(resp.content[i].groupName);
                        $("#permissionIds").append(op);
                        $('#permissionIds').trigger('chosen:updated');
                    }
                }
            },
            error: function (resp) {

            }
        });
    }

    var showPoto = function (photoPath) {
        if (photoPath && photoPath !== '') {
            $('#oldPhoto').show();
            var path = Env.context + '/file/image/' + photoPath;
            $('#imgUrl').attr('src',path);
            $('#imgUrl').attr("class","col-sm-5");
            $('#newImg').hide();
        } else {
            $('#oldPhoto').hide();
            $('#imgUrl').attr('src', '');
            $('#newImg').show();
        }
    };

    // 查询游客
    $('#searchBtn').click(function () {
        var cardNumber = $('#cardNumber').val();
        if (!cardNumber && cardNumber === '') {
            return;
        }

        var params = {};
        params.cardNumber = cardNumber;
        params.cardType = $('#cardType').val();
        params.unitCode = $('#unitCode').val();

        if (params.unitCode ==''){
            bootbox.alert("请选择Unit");
            return;
        }

        $.ajax({
            type: 'POST',
            url: searchUrl,
            data: params,
            dataType: 'json',
            success: function (resp) {
                if (resp.code && resp.code === 200) {
                    if (resp.custom && resp.custom !== '') {
                        $('#visitorId').val(resp.custom.visitorCode);
                        $('#mobile').val(resp.custom.mobile);
                        $('#userPhoto').val(resp.custom.userPhoto);
                        showPoto(resp.custom.userPhoto);
                        return;
                    }
                }
                $('#visitorId').val('');
                showPoto(null);
            },
            error: function (resp) {
                $('#visitorId').val('');
                showPoto(null);
            }
        });
    });


    // 提交表单
    $('#submitBtn').click(function () {
        $('#submitForm').submit();
    });

    // 返回列表
    $('#cancelBtn').click(function () {
        // undo(listUrl);
        location.href = listUrl;
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
        bootbox.alert('文件类型和大小不允许');
    });

});

