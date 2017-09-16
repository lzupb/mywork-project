/*
 * Copyright (C) 2017 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,bootbox,isNotSessionExpired,undo,operCompleted */

$(function () {

    var listUrl = Env.context + '/backendLog/list';
    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });

});