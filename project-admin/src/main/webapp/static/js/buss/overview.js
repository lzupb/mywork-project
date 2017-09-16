/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file login */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted */

$(function () {
    // 饼图一
    $.post(Env.context + '/overview/getDevicePie.json', function (data, status) {
        $('#container').pie(data.items, {
            titleText: '公司设备数量图'
        });
    });

    // 饼图二
    $.post(Env.context + '/overview/getVisitorPie.json', function (data, status) {
        $('#container2').pie(data.items, {
            titleText: '公司游客数量图'
        });
    });

    // 柱状、趋势图一
    $.post(Env.context + '/overview/getMixedGraph.json', function (data, status) {
        $('#container-axes').mixedGraph(data.items, {
            xCategories: data.categories,
            titleText: '近30天注册/识别统计趋势图'
        });
    });

});
