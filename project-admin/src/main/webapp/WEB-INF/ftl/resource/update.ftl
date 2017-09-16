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
                <li class="active">资源添加（修改）</li>
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
                                <label for="authGroup" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>资源类别</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="authGroup" name="authGroup" value="${bean.authGroup!''}"
                                               class="col-xs-10 col-sm-12" placeholder="资源类别">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="authName" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>资源名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="authName" name="authName" value="${bean.authName!''}"
                                               class="col-xs-10 col-sm-12" placeholder="资源名称">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="path" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>路径</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="path" name="path" value="${bean.path!''}"
                                               class="col-xs-10 col-sm-12" placeholder="路径">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">
                                    角色</label>

                                <div class="col-lg-4">
                                    <select multiple="multiple" name="roleIdList" id="roleIdList"
                                            data-placeholder="请选择角色"
                                            class="chosen-select">
                                    <#if bean??&&bean.resourceRoles??>
                                        <#list bean.resourceRoles as b >
                                            <option selected value="${b.roleCode}">${b.roleCode!}</option>
                                        </#list>
                                    </#if>
                                    </select>
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
<script src="<@spring.url '/static/js/buss/resource/update.js' />"></script>
</body>
<html>


