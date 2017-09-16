/** @file 更新 */
/* globals CONS,Env,enableChosen,enableSelect2,isNotSessionExpired,undo,bootbox,operCompleted,Process,JE */

$(function () {
    var updateJsonUrl = Env.context + '/unit/updateData.json';
    var listUrl = '/unit/list';
    enableChosen();

    $('#submitForm').validateAce({
        rules: {
            name: {
                required: true
            },
            unitCode: {
                required: true
            },
            idlApiAccountId: {
                required: true
            },
            types: {
                required: true
            },
            companyCode: {
                required: true
            }
        },
        submitHandler: function (f) {
            if ($('#id').val()) {
                $('#companyCode').prop('disabled', false).trigger('chosen:updated');
            }
            var obj = {};
            var validator = $('#submitForm').validate();
            var isRepeat = checkRepeat({
                unitCode:
                    ($('#parentUnitCode').val() ? $('#parentUnitCode').val() + '#' : '') + $('#unitCode').val()
            });
            if (isRepeat) {
                var propertyName = 'unitCode';
                var errorMessage = '组织编码已存在';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }
            isRepeat = checkRepeat({
                name: $('#name').val()
            });
            if (isRepeat) {
                var propertyName = 'name';
                var errorMessage = '名称已存在';
                obj[propertyName] = errorMessage;
                validator.showErrors(obj);
                return;
            }
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
    $('#parentId').change(function () {
        $(this).children().each(function () {
            if (this.selected) {
                $('#parentUnitCode').val($(this).attr('code'));
            }
        });
    });
    $('#companyCode').change(function () {
        $(this).children().each(function () {
            if (this.selected) {
                $('#name').val($(this).text());
            }
        });
    });

    // 提交表单
    $('#submitBtn').click(function () {
        $('#submitForm').submit();
    });

    if ($('#id').val()) {
        $('#companyCode').prop('disabled', true).trigger('chosen:updated');
    }
    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });
    JE.init('configText');
    $('#formatJson').click(function () {
        JE.format();
    });
    $('#fommatCompact').click(function () {
        JE.format(true);
    });
});

function checkRepeat(datas) {
    var findUrl = '/unit/find';
    var isRepeat = false;
    $.ajax({
        type: 'post',
        data: datas,
        url: findUrl,
        dataType: 'json',
        async: false,
        success: function (resp) {
            if (resp.code && resp.code === 200) {
                if (resp.data.rows.length > 0) {
                    if ($('#id').val()) {
                        for (var i = 0; i < resp.data.rows.length; i++) {
                            if ($('#id').val() !== (resp.data.rows[i].id + '')) {
                                isRepeat = true;
                            }
                        }
                    } else {
                        isRepeat = true;
                    }
                }
            }
        },
        error: function (resp) {

        }
    });
    return isRepeat;
}