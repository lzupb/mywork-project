<html>
<#include '../common/common-header.ftl'/>
<body class="no-skin">
<#include '../common/common-nav.ftl'/>
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
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

                            <input id="id" type="hidden" name="id" value="${ticket.id!''}"/>
                            <input id="unitCode" type="hidden" name="unitCode" value="${visitor.unitCode!''}"/>
                            <div class="form-group">
                                <label for="unitCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>unit-code</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="unitCode" name="unitCode"
                                               value="${visitor.unitCode}"
                                               class="col-xs-10 col-sm-12" placeholder="unitCode" disabled>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cardNumber" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>证件号码</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="cardNumber" name="cardNumber"
                                               value="${visitor.cardNumber!''}"
                                               class="col-xs-10 col-sm-12" placeholder="cardNumber" disabled>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="cardType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>证件类型</label>

                                <div class="col-sm-6">
                                    <select name="cardType" id="cardType" class="chosen-select"
                                            data-placeholder="请选择证件类型" disabled>
                                        <#if visitor.cardType??>
                                            <option selected value="${visitor.cardType.name()!''}">
                                            ${visitor.cardType.desc!''}
                                            </option>
                                        </#if>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="visitorCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>姓名(visitorId)</label>

                                <div class="col-sm-5">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="visitorCode" name="visitorCode"
                                               value="${visitor.visitorCode}"
                                               class="col-xs-10 col-sm-12" placeholder="visitorCode" disabled>
                                    </span>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-sm-3 control-label no-padding-right">
                                    图片
                                </label>

                                <div class="col-sm-6">
                                    <img src="<@spring.url '/file/image/'/>${visitor.userPhoto!''}"
                                         class="col-sm-12" style="max-height: 380px"></img>
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
                                        <input type="text" id="ticketCode" name="ticketCode"
                                               value="${ticket.ticketCode!''}"
                                               class="col-xs-10 col-sm-12" placeholder="票务code" disabled>
                                        <input id="ticketCode" type="hidden" name="ticketCode"
                                               value="${ticket.ticketCode!''}"/>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="orderCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>票务订单号</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="orderCode" name="orderCode"
                                               value="${ticket.orderCode!''}"
                                               class="col-xs-10 col-sm-12" placeholder="票务订单号" disabled>
                                        <input id="orderCode" type="hidden" name="orderCode"
                                               value="${ticket.orderCode!''}"/>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="startTime"
                                       class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>开始时间</label>

                                <div class="col-sm-6">
                                    <span class="block input-icon input-icon-right">
                                        <input name="startTime" id="startTime" type="text"
                                               value="${ticket.startTime!''}"
                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', minDate:'2017-01-01' })"
                                               class="form-control search-form-ipt" <#if !update>disabled</#if>>

                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="endTime"
                                       class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>结束时间</label>

                                <div class="col-sm-6">
                                    <span class="block input-icon input-icon-right">
                                        <input name="endTime" id="endTime" type="text"
                                               value="${ticket.endTime!''}"
                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss', minDate:'2017-01-01' })"
                                               class="form-control search-form-ipt" <#if !update>disabled</#if>>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="groupInfo"
                                       class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>权限组</label>

                                <div class="col-sm-4">
<#--                                    <span class="block input-icon input-icon-right">
                                    	<textarea maxlength="1000" name="groupCodes" id="groupCodes"
                                                  class="autosize-transition form-control"
                                                  <#if !update>disabled</#if>>${ticket
                                        .groupCodes!""}</textarea>
                                    </span>-->

                                    <select name="groupCodes" id="groupCodes" class="chosen-select"
                                            data-placeholder="Choose a State..." multiple >
                                        <option value=""></option>
                                    <#list groupInfo as ticketInfos>
                                        <#list groupList as groups>
                                            <option <#if ticketInfos==groups.groupCode>selected</#if> value="${groups.groupCode}">${groups.groupName}</option>
                                        </#list>
                                    </#list>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="space-4"></div>
                    <#if update>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="clearfix form-actions">
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="submitBtn" class="btn btn-info" type="button">
                                            <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                            保存修改
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
                    </#if>
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
<link rel="stylesheet" href="<@spring.url '/static/rome/rome.min.css' />"/>
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<script src="<@spring.url '/static/js/lib/jquery.form.js' />"></script>
<script src="<@spring.url '/static/rome/rome.min.js' />"></script>
<script src="<@spring.url '/static/assets/js/My97DatePicker/WdatePicker.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/ticket/update.js' />"></script>

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


