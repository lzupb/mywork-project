/*
 * Copyright (C) 2016 Baidu, Inc. All Rights Reserved.
 */

/** @file 列表 */
/* globals CONS,Env,enableChosen,bootbox,isNotSessionExpired,undo,operCompleted */

$(function () {

    var listUrl = Env.context + '/deviceLog/listRequestIn';
    // 返回列表
    $('#cancelBtn').click(function () {
        undo(listUrl);
    });

});