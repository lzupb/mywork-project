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
                    <a href="<@spring.url '/'/>">SBJK系统</a>

                </li>
                <li class="active">修改告警&上传</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal"
                              action="<@spring.url '/alert/updateData.json'/>" method="post">
                            <input type="hidden" name="alarmId" value="${bean.alarmId!''}"/>

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>event_time</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input maxlength="255" readonly type="text"  name="eventTime"
                                               value="${bean.eventTime!''}" class="col-xs-10 col-sm-12">
                                    </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>port_num </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" readonly type="text" name="portNum"
                                                   value="${bean.portNum!''}" class="col-xs-10 col-sm-12"
                                            >
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>object_class </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" readonly type="text" name="objectClass"
                                                   value="${bean.objectClass!''}" class="col-xs-10 col-sm-12"
                                            >
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>int_id </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" readonly type="text" name="intId"
                                                   value="${bean.intId!''}" class="col-xs-10 col-sm-12"
                                            >
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>neLable </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" readonly type="text" name="neLable"
                                                   value="${bean.neLable!''}" class="col-xs-10 col-sm-12"
                                            >
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>probableCause </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" readonly type="text" name="probableCause"
                                                   value="${bean.probableCause!''}" class="col-xs-10 col-sm-12"
                                            >
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>cancel_time </label>
                                <div class="col-sm-4">

                                    <input style="height: 30px;max-width: 165px;"
                                           id="cancelTime" required
                                           name="cancelTime" type="text" value="${bean.cancelTime!''}"
                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                </div>
                            </div>
                            <div class="space-4"></div>
                    </div>

                    <div class="clearfix form-actions">
                        <div class="col-md-offset-3 col-md-9">
                            <button id="submitBtn" class="btn btn-info" type="button">
                                <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                上 报
                            </button>
                            <span class="line-gap-15"></span>
                            <button id="cancelBtn" class="btn btn-info btn-warning" type="reset">
                            <#if bean??&&bean.id??>
                                <i class="ace-icon fa fa-times"></i>
                                关 闭
                            <#else>
                                <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                                返回
                            </#if>
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
<!-- /.main-content -->


<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
    <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
</a>
</div><!-- /.main-container -->


<!-- basic scripts -->
<#include "../common/common-immediate.ftl" />
<#include "../common/common-import-update.ftl" />
<script src="<@spring.url '/static/js/lib/moment.js' />"></script>
<script src="<@spring.url '/static/assets/js/My97DatePicker/WdatePicker.js' />"></script>
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/alert/update.js' />"></script>
</body>
<html>


