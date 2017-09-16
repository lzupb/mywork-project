<html>
<#include '../common/common-header.ftl'/>
<body class="no-skin">
<#include '../common/common-nav.ftl'/>
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
            alert(e);
        }
    </script>
    <!-- #section:basics/sidebar -->
<#include '../common/common-menu.ftl'/>
    <!-- /section:basics/sidebar -->
    <div class="main-content">
        <!-- #section:basics/content.breadcrumbs -->
        <div class="breadcrumbs" id="breadcrumbs">
            <script type="text/javascript">
                try {
                    ace.settings.check('breadcrumbs', 'fixed')
                } catch (e) {
                    alert(e);
                }
            </script>

            <ul class="breadcrumb" style="margin-top: 11px">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="<@spring.url '/'/>">通用人脸识别闸机系统</a>
                </li>
                <li>
                    <i class="ace-icon fa"></i>
                    <a href="<@spring.url '/ticket/list'/>">票务管理</a>
                </li>
                <li class="active">编辑票务</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">
                <form id="submitForm" role="form" class="form-horizontal" method="post"
                      enctype="multipart/form-data">

                    <div class="row">

                        <div class="col-xs-6">
                            <h4 class="widget-title lighter">
                                游客信息
                            </h4>

                            <div class="form-group">
                                <label for="unitCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>unit-code</label>

                                <div class="col-sm-5">
                                    <select name="unitCode" id="unitCode" class="chosen-select"
                                            data-placeholder="请选择unit">
                                        <option></option>
                                    <#list unitCodeList as b >
                                        <option value="${b.unitCode}">
                                        ${b.name}
                                        </option>
                                    </#list>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cardNumber" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>证件号码</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="cardNumber" name="cardNumber"
                                               class="col-xs-10 col-sm-12" placeholder="cardNumber">
                                    </span>
                                </div>
                                <button id="searchBtn" type="button" class="search-form-ipt search-form-btn btn
                                btn-purple btn-sm">
                                    查询
                                    <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                </button>
                            </div>


                            <div class="form-group">
                                <label for="cardType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>证件类型</label>

                                <div class="col-sm-5">
                                    <select name="cardType" id="cardType" class="chosen-select"
                                            data-placeholder="请选择证件类型">
                                    <#list cardTypeList as b >
                                        <option
                                            <#if "IdCard"==b.name()>selected</#if>
                                            value="${b.name()}">
                                        ${b.desc}
                                        </option>
                                    </#list>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="visitorId" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>姓名(visitorId)</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="visitorId" name="visitorId"
                                               class="col-xs-10 col-sm-12" placeholder="visitorId">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="mobile" class="col-sm-3 control-label no-padding-right glyphicon">
                                    手机号</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="mobile" name="mobile"
                                               class="col-xs-10 col-sm-12" placeholder="mobile">
                                    </span>
                                </div>
                            </div>


                            <div id="oldPhoto" class="form-group" style="display: none">
                                <label class="col-sm-3 control-label no-padding-right">
                                    原图片
                                </label>
                                <img id="imgUrl">
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label no-padding-right">
                                    <i id="newImg" class="required-mark"></i>
                                    图片
                                </label>

                                <div class="col-sm-5">
                                    <input type="file" class="ace-file" style="padding-left: 0" name="newphoto"
                                           id="newphoto">
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-6">
                            <h4 class="widget-title lighter">
                                票务信息
                            </h4>

                            <div class="form-group">
                                <label for="ticketCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>票务code</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="ticketId" name="ticketId"
                                               value=""
                                               class="col-xs-10 col-sm-12" placeholder="票务code">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="orderCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>票订单号</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="orderCode" name="orderCode" value=""
                                               class="col-xs-10 col-sm-12" placeholder="票订单号">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="startTime" class="col-sm-3 control-label no-padding-right glyphicon">
                                    开始时间</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input name="startTime" id="startTime" type="text"
                                               value="${curDay}"
                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', minDate:'2017-01-01' })"
                                               class="form-control search-form-ipt">
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="endTime" class="col-sm-3 control-label no-padding-right glyphicon">
                                    结束时间</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input name="endTime" id="endTime" type="text"
                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', minDate:'2017-01-01' })"
                                               class="form-control search-form-ipt" value="${dayEnd}"/>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="groupInfo"
                                       class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>权限组</label>

                                <div class="col-sm-4">
                                    <#--<span class="block input-icon input-icon-right">-->
                                    	<#--<textarea maxlength="1000" name="groupIds" id="groupIds"-->
                                                  <#--class="autosize-transition form-control"></textarea>-->
                                    <#--</span>-->
                                    <select name="groupIds" id="groupIds" class="chosen-select"
                                            data-placeholder="Choose a State..." multiple >
                                        <option value=""></option>
                                    <#if groupList??>
                                        <#list groupList as dg>
                                            <option value="${dg.groupCode}">${dg.groupName}</option>
                                        </#list>
                                    </#if>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-xs-12">
                                <div class="clearfix form-actions">
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="submitBtn" class="btn btn-info" type="button">
                                            <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                            添 加
                                        </button>
                                        <span class="line-gap-15"></span>
                                        <button id="cancelBtn" class="btn btn-warning" type="reset">
                                            <i class="ace-icon fa fa-times"></i>
                                            取 消
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /.page-content-area -->


    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>
</div><!-- /.main-container -->


<!-- basic scripts -->
<#include "../common/common-immediate.ftl" />
<#include "../common/common-import-update.ftl" />

<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<script src="<@spring.url '/static/js/lib/jquery.form.js' />"></script>
<script src="<@spring.url '/static/assets/js/My97DatePicker/WdatePicker.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/ticket/add.js' />"></script>
<script type="text/javascript">
    function cDayFunc() {
        var date = $dp.cal.newdate;
        console.log(date);
        var sd = date.d;
        var sh = date.H;
        var sm = date.m;
        var ss = date.s;
        var today = new Date().getDate();
        if (today === sd) {
            if ((sh == 23 && sm == 59 && ss == 59) || (sh == 13 && sm == 0 && ss == 0)) {
                date['H'] = 23;
                date['m'] = 59;
                date['s'] = 59;
            }
        } else {
            if ((sh == 23 && sm == 59 && ss == 59) || (sh == 13 && sm == 0 && ss == 0)) {
                date['H'] = 13;
                date['m'] = 0;
                date['s'] = 0;
            }
        }
    }
</script>
</body>
<html>


