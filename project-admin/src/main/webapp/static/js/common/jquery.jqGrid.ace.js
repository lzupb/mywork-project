/**
 * jquery.jqGrid.ace
 * 修改validate样式为ace样式
 * 依赖于bootbox
 */
$.extend($.fn.fmatter, {

    /**
     * 配置opr:[{}],支持的属性name,url必填，idName,css可选
     * @param cellval
     * @param opts
     * @param rwd
     * @returns {*}
     */
    operate: function (cellval, opts, rwd) {
        var settings = {
            items: [],
            addParams: function (url, key, value) {
                if (!url)return;
                var newUrl;
                if (url.indexOf("?") == -1) {
                    newUrl = url + "?" + key + "=" + value;
                } else {
                    newUrl = url + "&" + key + "=" + value;
                }
                return newUrl;
            }
        };
        settings.items = [];
        var items = opts.colModel.formatoptions.opr; //操作的配置
        var gridId = opts.gid;
        var html = '<div class="action-buttons left">';
        if (items) {
            $.each(items, function (idx, item) {
                if (!item.url || !item.name) return;
                var defaults = {
                    title: "操作确认",
                    tips: "确认是否执行操作",
                    confirmLabel: "确认",
                    cancelLabel: "取消",
                    successTips: "操作成功",
                    errorTips: "操作失败",
                    idName: "id",
                    css: undefined,
                    target: "_self",
                    data: {},
                    //rowId: rowData.id,
                    //rowData: rowData,
                    gridId: gridId
                };
                item = $.extend({}, defaults, item); //合并公共配置.
                if ($.isFunction(item.hidden) && item.hidden(rwd)) {
                    return;
                }

                if ($.isFunction(item.data)) {
                    item.data = item.data(rwd);
                }

                var itemUrl = '<a id=' + rwd.id + ' href="javascript:void(0);" title="';
                if (item.onclick === 'onclick') {
                    //onclick = "onclick" ? $.fn.fmatter.onclickOpr : onclick;
                    //onclickHtml = 'if($.isFunction(' + onclick + ')) ' + onclick + '.call(this,' + item, '); else' +' eval(' + onclick + ');';
                    //var onclickHtml = '$.fn.fmatter.onclickOpr.call(this,\'' + idx + '\',\'' + rwd.id + '\')';
                    var onclickHtml = '$.fn.fmatter.onclickOpr.call(this,\'' + idx + '\',\'' + rwd.id + '\')';
                    itemUrl += item.name + '" onclick="' + onclickHtml + '"';
                } else if (item.onclick === 'submit') {
                    var onclickHtml = '$.fn.fmatter.submitOpr.call(this,\'' + idx + '\',\'' + rwd.id + '\')';
                    itemUrl += item.name + '" onclick="' + onclickHtml + '"';
                } else {
                    var paramUrl = settings.addParams(item.url, item.idName, rwd.id);
                    $.map(item.data, function (value, key) {
                        paramUrl += "&" + key + "=" + value;
                    });
                    itemUrl = '<a href="' + paramUrl + '" title="' + item.name + '" target="' + item.target + '"';
                }
                itemUrl += ' class="blue">';
                if (item.css) itemUrl += '<i class="' + item.css + '"></i>';
                else itemUrl += item.name;
                itemUrl += '</a>';
                html += itemUrl;
                var fn = {
                    dialog: function (rowId) {
                        //fn.rowid=rowId;
                        bootbox.dialog({
                            message: item.tips,
                            title: item.title,
                            buttons: {
                                confirm: {
                                    label: item.confirmLabel,
                                    className: "btn-danger",
                                    callback: function () {
                                        item.submit(rowId);
                                    }
                                },
                                cancel: {
                                    label: item.cancelLabel,
                                    className: "btn-primary",
                                    callback: item.cancel
                                }
                            }
                        });
                    },
                    submit: function (rowId) {
                        $.ajax({
                            type: 'post',
                            url: settings.addParams(item.url, item.idName, rowId),
                            data: item.data,
                            dataType: 'json',
                            success: function (resp) {
                                item.success(resp);
                            },
                            error: function (resp, errq) {
                                item.error(resp, errq);
                            }
                        });
                    },
                    cancel: function () {
                        //noting
                    },
                    success: function (resp) {
                        if (resp.code && resp.code == 200) {
                            var gridTable = $("#" + item.gridId);
                            bootbox.alert(item.successTips);
                            gridTable.trigger("reloadGrid");//刷新表格
                        } else {
                            bootbox.alert(resp.msg);
                        }
                    },
                    error: function (resp, errq) {
                        var msg = item.errorTips;
                        if (resp.responseText)
                            msg = resp.responseText;
                        bootbox.alert(msg);
                    }
                };
                item = $.extend({}, fn, item); //合并函数.
                item.gridId = gridId;
                settings.items[idx] = item;
            });
        }
        html += '</div>';

        var itemArray = $(this).data('item');
        if (!itemArray)    itemArray = [];
        itemArray[rwd.id] = settings.items;
        $(this).data('item', itemArray);

        $.fn.fmatter.onclickOpr = function (itemIdx, rowId) {
            var obj = $(this).parents('#grid-table').data('item')
            obj[rowId][itemIdx].dialog(rowId);
        };

        $.fn.fmatter.submitOpr = function (itemIdx, rowId) {
            var obj = $(this).parents('#grid-table').data('item')
            obj[rowId][itemIdx].submit(rowId);
        };

        return html;
    },

    operateFormat: function (cellval, opts, rowData) {
        var defaults = {
            enableApprove: true,//是否启用通过按钮, 目前没有使用，而是采用的url来判断是否启用
            approveTipMessage: "确定通过选中记录?",
            approveCancelLable: "Cancel",
            approveConfirmLable: "confirm",
            approveUrl: "", //通过请求地址
            approveData: "",//approve参数
            approveHandler: function (rowId, tableId) {//默认的approve处理
                var curApproveData = setting.approveData;
                if (curApproveData === "") {
                    curApproveData = $.extend(curApproveData, {id: rowId});
                }
                <!--普通的消息提示框 -->
                bootbox.dialog({
                    message: setting.approveTipMessage,
                    buttons: {
                        confirm: {
                            label: setting.approveConfirmLable,
                            className: "btn-danger",
                            callback: function () {
                                $.ajax({
                                    type: 'post',
                                    url: setting.approveUrl,
                                    data: curApproveData,
                                    dataType: 'json',
                                    success: function (resp) {
                                        if (resp.code && resp.code == 200) {
                                            var gridTable = $("#" + tableId);
                                            gridTable.trigger("reloadGrid");//刷新表格
                                            bootbox.alert("通过记录成功");
                                        } else {
                                            bootbox.alert(resp.message);
                                        }
                                    },
                                    error: function (resp, errq) {
                                        if (isNotSessionExpired(resp)) {
                                            bootbox.alert("操作失败");
                                        }
                                    }
                                });
                            }
                        },
                        cancel: {
                            label: setting.approveCancelLable,
                            className: "btn-primary",
                            callback: function () {
                            }
                        }
                    }
                });
            },

            enableDisapprove: true,//是否启用不通过按钮, 目前没有使用，而是采用的url来判断是否启用
            disapproveTipMessage: "确定不通过选中记录?",
            disapproveCancelLable: "Cancel",
            disapproveConfirmLable: "confirm",
            disapproveUrl: "", //不通过请求地址
            disapproveData: "",//disapprove参数
            disapproveHandler: function (rowId, tableId) {//默认的disapprove处理
                var curDisapproveData = setting.disapproveData;
                if (curDisapproveData === "") {
                    curDisapproveData = $.extend(curDisapproveData, {id: rowId});
                }
                <!--普通的消息提示框 -->
                bootbox.dialog({
                    message: setting.disapproveTipMessage,
                    buttons: {
                        confirm: {
                            label: setting.disapproveConfirmLable,
                            className: "btn-danger",
                            callback: function () {
                                $.ajax({
                                    type: 'post',
                                    url: setting.disapproveUrl,
                                    data: curDisapproveData,
                                    dataType: 'json',
                                    success: function (resp) {
                                        if (resp.code && resp.code == 200) {
                                            var gridTable = $("#" + tableId);
                                            gridTable.trigger("reloadGrid");//刷新表格
                                            bootbox.alert("不通过记录成功");
                                        } else {
                                            bootbox.alert(resp.message);
                                        }
                                    },
                                    error: function (resp, errq) {
                                        if (isNotSessionExpired(resp)) {
                                            bootbox.alert("操作失败");
                                        }
                                    }
                                });
                            }
                        },
                        cancel: {
                            label: setting.disapproveCancelLable,
                            className: "btn-primary",
                            callback: function () {
                            }
                        }
                    }
                });
            },

            enableDisable: true,//是否启用禁用按钮, 目前没有使用，而是采用的url来判断是否启用
            disableTipMessage: "确定禁用选中记录?",
            disableCancelLable: "Cancel",
            disableConfirmLable: "confirm",
            disableUrl: "", //禁用请求地址
            disableData: "",//disable参数
            disableHandler: function (rowId, tableId) {//默认的disable处理
                var curDisableData = setting.disableData;
                if (curDisableData === "") {
                    curDisableData = $.extend(curDisableData, {id: rowId});
                }
                <!--普通的消息提示框 -->
                bootbox.dialog({
                    message: setting.disableTipMessage,
                    buttons: {
                        confirm: {
                            label: setting.disableConfirmLable,
                            className: "btn-danger",
                            callback: function () {
                                $.ajax({
                                    type: 'post',
                                    url: setting.disableUrl,
                                    data: curDisableData,
                                    dataType: 'json',
                                    success: function (resp) {
                                        if (resp.code && resp.code == 200) {
                                            var gridTable = $("#" + tableId);
                                            gridTable.trigger("reloadGrid");//刷新表格
                                            bootbox.alert("禁用记录成功");
                                        } else {
                                            bootbox.alert(resp.message);
                                        }
                                    },
                                    error: function (resp, errq) {
                                        if (isNotSessionExpired(resp)) {
                                            bootbox.alert("操作失败");
                                        }
                                    }
                                });
                            }
                        },
                        cancel: {
                            label: setting.disableCancelLable,
                            className: "btn-primary",
                            callback: function () {
                            }
                        }
                    }
                });
            },

            enableUpdate: true,//是否启用编辑按钮, 目前没有使用，而是采用的url来判断是否启用
            updateUrl: "", //编辑请求地址
            updateData: "",//update参数
            updateLabel: '', // 若设置，则已文案的形式显示超链接
            updateHandler: function (rowId, rowData, tableId) {//默认的update处理
                var curUpdateData = setting.updateData;
                if (curUpdateData === "") {
                    curUpdateData = $.extend(curUpdateData, {id: rowId});
                }
                //   location.href = setting.updateUrl + "?" + decodeURIComponent($.param(curDeleteData),true);
                var newUrl = setting.updateUrl + "?" + decodeURIComponent($.param(curUpdateData), true);
                window.open(newUrl, '_blank');
            },
            enableView: true,//是否启用View, 目前没有使用，而是采用的url来判断是否启用
            viewUrl: "",
            viewData: "",
            viewLabel: '', // 若设置，则已文案的形式显示超链接
            viewColNames: "", //编辑的参数名称,参数的值会加到请求的参数里
            viewHandler: function (rowId, rowData, tableId) {//默认的viewupdate处理
                var curViewData = setting.viewData;
                if (curViewData === "") {
                    curViewData = $.extend(curViewData, {id: rowId});
                }
                if (setting.viewColNames != null) {
                    setting.viewColNames.forEach(function (colName) {
                        var cell = $("#grid-table").getCell(rowId, colName);
                        curViewData[colName] = cell;
                    });
                }
                var newUrl = setting.viewUrl + "?" + decodeURIComponent($.param(curViewData), true);
                window.open(newUrl, '_blank');
            },
            enableChart: true,//是否启用图表, 目前没有使用，而是采用的url来判断是否启用
            chartUrl: "",
            chartData: "",
            chartColNames: "", //编辑的参数名称,参数的值会加到请求的参数里
            chartHandler: function (rowId, rowData, tableId) {//默认的viewupdate处理
                var curViewData = setting.chartData;
                if (curViewData === "") {
                    curViewData = $.extend(curViewData, {id: rowId});
                }
                if (setting.chartColNames != null) {
                    setting.chartColNames.forEach(function (colName) {
                        var cell = $("#grid-table").getCell(rowId, colName);
                        curViewData[colName] = cell;
                    });
                }
                var newUrl = setting.chartUrl + "?" + decodeURIComponent($.param(curViewData), true);
                window.open(newUrl, '_blank');
            },
            enableDelete: true, //是否启用删除按钮, 目前没有使用，而是采用的url来判断是否启用
            deleteTipMessage: "确定要删除选中记录?",
            deleteUrl: "",
            deleteData: "",
            deleteLabel: '', // 若设置，则已文案的形式显示超链接
            deleteCancelLable: "取消",
            deleteConfirmLable: "确定",
            deleteHandler: function (rowId, tableId) {
                var curDeleteData = setting.deleteData;
                if (curDeleteData === "") {
                    curDeleteData = $.extend(curDeleteData, {id: rowId});
                }
                <!--普通的消息提示框 -->
                bootbox.dialog({
                    message: setting.deleteTipMessage,
                    //  title: "Custom title",
                    buttons: {
                        confirm: {
                            label: setting.deleteConfirmLable,
                            className: "btn-danger",
                            callback: function () {
                                $.ajax({
                                    type: 'post',
                                    url: setting.deleteUrl,
                                    data: curDeleteData,
                                    dataType: 'json',
                                    success: function (resp) {
                                        if (resp.code && resp.code == 200) {
                                            var gridTable = $("#" + tableId);
                                            gridTable.trigger("reloadGrid");//刷新表格
                                            bootbox.alert("删除成功");
                                        } else {
                                            bootbox.alert(resp.msg);
                                        }
                                    },
                                    error: function (resp, errq) {
                                        if (isNotSessionExpired(resp)) {
                                            bootbox.alert("操作失败");
                                        }
                                    }
                                });
                            }
                        },
                        cancel: {
                            label: setting.deleteCancelLable,
                            className: "btn-primary",
                            callback: function () {
                            }
                        }
                    }
                });
            }
        };
        var setting = $.extend(defaults, opts.colModel.formatoptions.settings);
        $.fn.approveAceRowHandler = setting.approveHandler;
        $.fn.disapproveAceRowHandler = setting.disapproveHandler;
        $.fn.disableAceRowHandler = setting.disableHandler;
        $.fn.updateAceRowHandler = setting.updateHandler;
        $.fn.deleteAceRowHandler = setting.deleteHandler;
        $.fn.viewAceRowHandler = setting.viewHandler;
        $.fn.chartAceRowHandler = setting.chartHandler;
        var oper = '<div class="action-buttons center">';
        if (setting.updateUrl && setting.updateUrl.trim() != "") {
            var label = setting.updateLabel || '<i class="ace-icon fa fa-pencil bigger-130"></i>';
            oper += '<a href="#" title="编辑" onclick="$.fn.updateAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue">' + label + '</a>';
            oper += '<span class="vbar"></span>';
        }
        if (setting.deleteUrl && setting.deleteUrl.trim() != "") {
            var label = setting.deleteLabel || '<i class="ace-icon fa fa-trash-o bigger-130"></i>';
            oper += '<a href="#" title="删除" onclick="$.fn.deleteAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="red">' + label + '</a>';
            oper += '<span class="vbar"></span>';
        }
        if (setting.viewUrl && setting.viewUrl.trim() != "") {
            var label = setting.viewLabel || '<i class="ace-icon fa fa-eye bigger-130"></i>';
            oper += '<a href="#" title="查看详情" onclick="$.fn.viewAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue">' + label + '</a>';
            oper += '<span class="vbar"></span>';
        }
        if (setting.chartUrl && setting.chartUrl.trim() != "") {
            oper += '<a href="#" title="趋势" onclick="$.fn.chartAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue"><i class="ace-icon fa fa-signal bigger-130"></i></a>';
            oper += '<span class="vbar"></span>';
        }
        if (setting.approveUrl && setting.approveUrl.trim() != "" && rowData.status.desc == "审核中") {
            oper += '<a href="#" title="通过" onclick="$.fn.approveAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue"><i class="ace-icon fa fa-check-circle-o bigger-130"></i></a>';
            oper += '<span class="vbar"></span>';
        }
        if (setting.disapproveUrl && setting.disapproveUrl.trim() != "" && rowData.status.desc == "审核中") {
            oper += '<a href="#" title="不通过" onclick="$.fn.disapproveAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue"><i class="ace-icon fa fa-minus-circle bigger-130"></i></a>';
            oper += '<span class="vbar"></span>';
        }
        if ((setting.disableUrl && setting.disableUrl.trim() != "") && rowData.status.desc == "通过") {
            oper += '<a href="#" title="禁用" onclick="$.fn.disableAceRowHandler.call(this, \'' + rowData.id + '\',\'' + opts.gid + '\')" class="blue"><i class="ace-icon fa fa-stop bigger-130"></i></a>';
            oper += '<span class="vbar"></span>';
        }

        oper += '</div>';
        return oper;
    },
    // 数字按百分比显示
    percentage: function (cellval, opts, rowData) {
        var defaults = {
            decimalPlaces: 2, // 小数位数
            defaultValue: "0.00%" //默认值
        };
        var setting = $.extend(defaults, opts.colModel.formatoptions);
        if ($.fmatter.isEmpty(cellval)) {
            return setting.defaultValue;
        }
        if (isNaN(cellval)) {
            return "TypeError";
        }
        return (cellval * 100).toFixed(setting.decimalPlaces) + "%";
    }
});