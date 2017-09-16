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
                <li class="active">审批权限管理</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal" method="post">
                            <div class="form-group">
                                <label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">
                                    角色</label>

                                <div class="col-lg-4">
                                    <input type="hidden" class="col-xs-10 col-sm-12" name="roleId" value="${bean.id}"/>
                                    <input type="text" readonly value="${bean.label!}[${bean.name!}]"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="userList" class="col-sm-3 control-label no-padding-right glyphicon">
                                    审批范围</label>

                                <div class="col-lg-4" >
                                    <span class="block input-icon input-icon-right">
                                    	<select name="onlineTicketIds" id="onlineTicketIds" class="chosen-select"
                                                data-placeholder="选择可审批上票" multiple>
                                        <#list onlineTickets as tic>
                                            <option
                                                <#if beanOnlineTicketIdSet?seq_contains(tic.id)>selected</#if>
                                                    value="${tic.id}">
                                            ${tic.name}
                                            </option>
                                        </#list>
                                        </select>
                                    </span>
                                </div>
                                <label>
                                    <input id="allCheckBtn" class="ace ace-switch ace-switch-6" type="checkbox" />
                                    <span class="lbl" style="display:inline-block"></span>
                                </label>
                            </div>

                            <div class="space-4"></div>
                            <div class="clearfix form-actions">
                                <div class="col-md-offset-3 col-md-9">
                                    <button id="submitBtn" class="btn btn-info" type="button">
                                        <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                        设 置
                                    </button>
                                    <span class="line-gap-15"></span>
                                    <button id="cancelBtn" class="btn btn-warning" type="reset">
                                        <i class="ace-icon fa fa-times"></i>
                                        关 闭
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
<script src="<@spring.url '/static/js/buss/role/updateAuthApproval.js' />"></script>
</body>
<html>
