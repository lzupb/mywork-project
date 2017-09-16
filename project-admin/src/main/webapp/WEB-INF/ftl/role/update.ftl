<html>
<#include '../common/common-header.ftl'/>
<style type="text/css">
    /*.authCheckBox div {*/
    /*width: 20%;*/
    /*}*/

</style>
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
                <li class="active">修改权限</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal" method="post">
                            <input id="id" type="hidden" name="id" value="${bean.id!''}"/>
                            <div class="form-group">
                                <label for="label" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>角色名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="label" name="label" value="${bean.label!''}" disabled
                                               class="col-xs-10 col-sm-12">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="name" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>角色code</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="name" name="name" value="${bean.name!''}" disabled
                                               class="col-xs-10 col-sm-12">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="description"
                                       class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>描述</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                    	<textarea maxlength="300" name="description" id="description" disabled
                                                  class="autosize-transition form-control">${bean.description!""}</textarea>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-sm-3 control-label no-padding-right glyphicon">权限范围</label>

                                <div class="col-sm-9">
                                <#list groupNameMap?keys as key >
                                    <div class="authCheckBox">
                                        <div class="checkbox col-sm-3">
                                            <label>
                                                <input name="form-field-checkbox" type="checkbox" class="ace group">
                                                <span class="lbl red">${key}</span>
                                            </label>
                                        </div>

                                        <div class="col-sm-9">
                                            <#list groupNameMap[key] as name>
                                                <#assign fullName="${key}|${name}">
                                                <div class="checkbox col-sm-3">
                                                    <label>
                                                        <input value="${fullName}" name="resourceName"
                                                               <#if groupNameSet?seq_contains(fullName)>checked</#if>
                                                               type="checkbox" class="ace item">
                                                        <span class="lbl blue">${name}</span>
                                                    </label>
                                                </div>
                                            </#list>
                                        </div>
                                    </div>
                                </#list>
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
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<script src="<@spring.url '/dep/js/select2/select2.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/role/update.js' />"></script>
</body>
<html>


