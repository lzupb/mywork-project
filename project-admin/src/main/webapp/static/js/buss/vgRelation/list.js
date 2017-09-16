/** @file 列表 */
/* globals CONS,Env,enableChosen,isNotSessionExpired,undo,bootbox,operCompleted,updatePagerIcons,jqgridCommons,enableJqGridAutoResize */

$(function () {
    var gridSelector = '#grid-table';
    var pagerSelector = '#grid-pager';

    var listJsonUrl = Env.context + '/vgRelation/getData.json';

    // 启用chosen组建
    enableChosen();
    // 启用jqGrid自适应大小
    enableJqGridAutoResize(gridSelector);

    jQuery(gridSelector).jqGrid({
        url: listJsonUrl,
        datatype: 'json',
        postData: $('#search-form').serializeJSON(),
        height: 'auto',
        mtype: 'POST',
        colNames: ['组织', '游客组变化时间', '权限组UUCode', '权限组编号', '权限组名称', '同步状态', '游客UUCode', '游客编号', '游客名称', 'id'],
        colModel: [
            {name: 'unitName', index: 'unitName', sortable: false},
            {name: 'lastModifiedDate', index: 'lastModifiedDate', sortable: false},
            {name: 'bfrGroupCode', index: 'bfrGroupCode', sortable: false},
            {name: 'groupCode', index: 'groupCode', sortable: false},
            {name: 'groupName', index: 'groupName', sortable: false},
            {name: 'syncStatusEnum.desc', index: 'syncStatusEnum', sortable: false},
            {name: 'visitorUUCode', index: 'visitorUUCode', sortable: false},
            {name: 'visitorCode', index: 'visitorCode', sortable: false},
            {name: 'visitorName', index: 'visitorName', sortable: false},
            {name: 'id', index: 'id', hidden: true}
        ],
        autowith: true,
        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30, 50, 100],
        pager: pagerSelector,
        altRows: true,
        // sortname: 'createTime_desc',
        jsonReader: jqgridCommons.jsonReader,
        multiboxonly: true,
        loadComplete: updatePagerIcons
    });
    $(window).triggerHandler('resize.jqGrid');

    // search
    $('.search-form-btn').on('click', function () {
        var visitorCode = $('#visitorCode').val();
        var unitCode = $('#unitCode').val();
        if (visitorCode.trim().length > 0 && unitCode.length === 0) {
            bootbox.alert('请选择组织');
            return;
        }

        $(gridSelector).setGridParam({
            postData: null
        });
        $(gridSelector).jqGrid('setGridParam', {
            datatype: 'json',
            postData: $('#search-form').serializeJSON(),
            page: 1
        }).trigger('reloadGrid'); // 重新载入
    });

    // reset
    $('.cancel-form-btn').on('click', function () {
        var sform = $('#search-form');
        sform.find('select').val('').trigger('chosen:updated');
        sform[0].reset();
        $('#status').trigger('chosen:updated');
    });

});