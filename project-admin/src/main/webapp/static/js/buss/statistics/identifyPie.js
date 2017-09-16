/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file login */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    // 饼图一
    $.post(Env.context + '/overview/getDevicePie.json', function (data, status) {
        $('#container').pie(data.items, {
            titleText: '识别占比图'
        });
    });

});
