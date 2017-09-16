/*
 * 此文件主要是用户一些公用的js，
 * 方便在各业务模板中调用，
 * 并且此文件执行是在所有lib js 文件加载完成以后执行。
 * common-immediate.ftl 的区别：
 *  commons-immediate.ftl：
 *  是在一些lib加载完成前就执行
 *  主要用户一些要先加载的js 和 需要DOM完成后立即加载的js
 *
 */

/** 更新分页按钮样式 **/
var updatePagerIcons = function (table) {
    setTimeout(function () {
        var replacement =
        {
            'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }, 0);
};

var jqgridCommons = {
    jsonReader: {
        root: "data.rows",
        total: "data.total",
        page: "data.page",
        records: "data.records"
    }
};

var enableChosen = function (selector, options) {
    var defaultSelector = '.chosen-select';
    if (!selector) {
        selector = defaultSelector;
    }
    var defaultOptions = {allow_single_deselect: true, search_contains: true, width: '100%'};
    var chosenOptions = $.extend(defaultOptions, options);
    $(selector).each(function () {
        $(this).chosen(chosenOptions);
    });
    $(window)
        .off('resize.chosen')
        .on('resize.chosen', function () {
            $(selector).each(function () {
                var $this = $(this);
                $this.next().css({'width': '100%'});
            })
        }).trigger('resize.chosen');
};
/**
 * 设置jqgrid自适应大小
 * @param grid
 */
var enableJqGridAutoResize = function (grid) {
    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        $(grid).jqGrid('setGridWidth', $('.page-content').width());
    });
    //resize on sidebar collapse/expand
    var parent_column = $(grid).closest('[class*="col-"]');
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid).jqGrid('setGridWidth', parent_column.width());
            }, 0);
        }
    })
};
//去左右空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 判断是否为字符串
String.prototype.isNum = function () {
    var pattern = /^[0-9]+$/;
    if (this && this != '') {
        if (pattern.test(this)) {
            return true;
        }
    }
    return false;
};
// 全部去除
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, 'g'), s2);
};

// 验证是否为手机号
String.prototype.isMobile = function () {
    var pattern = /^1[3-9][0-9]{9}$/;
    if (this != '') {
        if (!pattern.exec(this)) {
            return false;
        }
    }
    return true;
};


//自行添加错误提示语
function reset_error_message(element) {
    if (element.closest('.form-group').find('.error-tip-special-message').length > 0) {
        element.closest('.form-group').addClass('has-error-special');
    }
}

function add_custom_error_style(element, tips, customClass) {
    element.closest('.col-sm-4').after("<div class='error-tip-special-message " + customClass + " help-block col-xs-12 col-sm-reset inline'>" + tips + "</div>");
    element.closest(".form-group").addClass("has-error-special");
}

function clear_custom_error_style(element, customClass) {
    element.closest('.form-group').find('.' + customClass).remove();
    element.closest('.has-error-special').removeClass('has-error-special');
}

function clearSelectErrorStyle(element) {
    element.closest('.has-error-special').find('.error-select-tip').remove();
    if (element.closest('.has-error-special').find('.error-input-tip').length == 0) {
        element.closest('.has-error-special').removeClass('has-error-special');
    }
}


//给某元素添加错误样式
function addErrorStyle(element, tips) {
    element.closest('.col-sm-4').after("<div class='error-tip-special-message help-block col-xs-12 col-sm-reset inline'>" + tips + "</div>");
    element.closest('.form-group').addClass('has-error-special');
}

//清空某元素的错误样式
function clearErrorStyle(element) {
    element.closest('.has-error-special').find('.error-tip-special-icon').remove();
    element.closest('.has-error-special').find('.error-tip-special-message').remove();
    element.closest('.has-error-special').removeClass('has-error-special');
}

/**
 * 获取当前时间(年和月)
 * @returns {string}
 */
var getYearMonth = function () {
    var now = new Date();
    return now.getFullYear() + '_' + (now.getMonth() + 1);
};

// 保存完成
var operCompleted = function (path) {
    if ($("input[name='id']").val() != '') {
        //    console.info("...close..");
        window.parent.opener.location.reload();
        window.close();
    } else {
        //    console.info("...href..");
        location.href = Env.context + path;
    }

};
// 关闭
var undo = function (path) {
    if ($("input[name='id']").val() != "") {
        window.close();
    } else {
        location.href = Env.context + path;
    }
};

// 判断session expired error
function isSessionExpired(xhr) {
    if (xhr && xhr.responseJSON && xhr.responseJSON.sessionTimeOutStatus == 900) {
        return true;
    }
    return false;
}
// 判断session是否过期
function isNotSessionExpired(xhr) {
    return !isSessionExpired(xhr);
}

// ajax 全局设置, 处理session 过期的异常 ajaxError
$(document).ajaxError(function (event, xhr, settings, thrownError) {
    if (xhr && xhr.responseJSON && xhr.responseJSON.sessionTimeOutStatus == 900) {
        if (xhr.responseJSON.message) {
            bootbox.alert(xhr.responseJSON.message);
        } else {
            bootbox.alert('登录超时，请刷新页面重新登录');
        }

    }
});
// 初始化上下文
if (typeof initContext === 'function') {
    initContext('');
}


//$.extend({
//    doAjax: function (options) {
//        var userDefError;
//        if (options && options.error) {
//            userDefError = options.error;
//        }
//        options.error = function (resp, errq) {
//            if (resp && resp.responseJSON && resp.responseJSON.sessionTimeOutStatus == 900) {
//                if (xhr.responseJSON.message) {
//                    alert(xhr.responseJSON.message);
//                } else {
//                    alert('登录超时，请重新登录');
//                }
//            } else {
//                userDefError(resp, errq);
//            }
//        };
//        $.ajax(options);
//    }
//});

/**
 * select2插件  (如果使用此插件，请在页面加载的时候调用此方法)
 * @param width
 * @author wangletian01
 * @date: 2015年9月18日 上午10:48:11
 */
function enableSelect2(width) {
    if (width == undefined || width == '' || width == null) {
        width = '358px';
    }
    console.log(width);
    $('.select2').css('width', width).select2({allowClear: true})
    $('#select2-multiple-style .btn').on('click', function (e) {
        var target = $(this).find('input[type=radio]');
        var which = parseInt(target.val());
        if (which == 2) $('.select2').addClass('tag-input-style');
        else $('.select2').removeClass('tag-input-style');
    });
}


$(".outer-href-link").click(function () {
    var relationUrl = $(this).attr("relationUrl");
    window.open(relationUrl, '_blank');
});


var enableAccountSuggest = function (accountItem) {
    accountItem.ajaxChosen({
        dataType: 'json',
        type: 'POST',
        url: Env.context + '/remoteData/getAccount.json'
    }, {
        processItems: function (resp) {
            return resp.data.map(function (item) {
                return {
                    id: item.code,
                    name: item.name +
                    '    内部ID：' + item.code +
                    '    外部ID：' + item.externalUserId +
                    '    ' + (item.status.desc == '启用' ? '' : '(已禁用)')
                }
            });

        }
    });
};




