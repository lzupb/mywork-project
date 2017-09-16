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
                <li class="active">账号添加（修改）</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal" method="post">
                            <input id="id" type="hidden" name="id" value="${bean.id!''}"/>
                            <input type="hidden" name="createdBy" value="${(bean.createdBy)!''}"/>
                            <input type="hidden" name="createdDate"
                                   value="${(bean.createdDate?string("yyyy-MM-dd HH:mm:ss"))!''}"/>

                            <div class="form-group">
                                <label for="config" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>账号名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="name" name="name" value="${bean.name!''}"
                                               class="col-xs-10 col-sm-12" placeholder="账号名称">
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="accountType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>账号类别</label>

                                <div class="col-sm-4">
                                <#list accountTypeList as b>
                                    <div class="radio accountType" style="display:inline;float:left;">
                                        <label>
                                            <input name="accountType" value="${b.name()}" type="radio"
                                                   class="ace"
                                                   <#if bean?? && bean.accountType?? && bean.accountType.name()==b.name()>checked</#if>/>
                                            <span class="lbl">${b.desc}</span>
                                        </label>
                                    </div>
                                </#list>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right">
                                    <i class="required-mark"></i>基本配制
                                </label>
                                <div class="col-sm-4">
                                    <div class="checkbox">
                                        <div id="formatJson" class="btn btn-xs btn-danger"> &nbsp;格式化显示 &nbsp;</div>
                                        &nbsp;<div id="fommatCompact" class="btn btn-xs btn-info"> &nbsp;&nbsp;紧凑显示 &nbsp;&nbsp;</div>
                                        <div id="jsonTipMessage" style="padding-right: 20px;" class="inline-right error-message"></div>
                                        <br/>
                                        <textarea maxlength="2000" id="configText" name="config" cols="30" rows="11" placeholder="基本配制" class="autosize-transition form-control">${bean.config!""}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right">
                                    描述
                                </label>
                                <div class="col-sm-4">
                                    <div class="checkbox">
                                        <textarea maxlength="2000" name="description" cols="30" rows="11" placeholder="描述" class="autosize-transition form-control">${bean.description!""}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="clearfix form-actions">
                                <div class="col-md-offset-3 col-md-9">
                                    <button id="submitBtn" class="btn btn-info" type="button">
                                        <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                        保 存
                                    </button>
                                    <span class="line-gap-15"></span>
                                    <button id="cancelBtn" class="btn btn-warning" type="reset">
                                    <#if bean??&&bean.id??>
                                        <i class="ace-icon fa fa-times"></i>
                                        关 闭
                                    <#else>
                                        <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                                        返 回
                                    </#if>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- /.page-content-area -->
        </div>
        <!-- /.page-content -->
    </div>
    <!-- /.main-content -->


    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>
</div><!-- /.main-container -->


<!-- basic scripts -->
<#include "../common/common-immediate.ftl" />
<#include "../common/common-import-update.ftl" />
<script src="<@spring.url '/static/js/common/beautify.js' />"></script>
<script src="<@spring.url '/static/js/common/jsonformate.js' />"></script>
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<script src="<@spring.url '/dep/js/select2/select2.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/idlAccount/update.js' />"></script>
</body>
<html>


