<#escape x as x?html>
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
                <li class="active">组织授权</li>
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

                            <input id="id" type="hidden" name="acUnitCode" value="${(bean.grantee.unitCode)!''}"/>
                            <input id="id" type="hidden" name="dcUnitCode" value="${(bean.grantor.unitCode)!''}"/>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="accountType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>授权者</label>

                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
                                            <select name="grantorId" id="granteeId" class="chosen-select"
                                                    data-placeholder="请选择">
                                                        <option value=""></option>
                                                <#if dcUnits??>
                                                    <#list dcUnits as unit>
                                                        <option
                                                            <#if bean.grantor??&&(unit.id == bean.grantor.id)>selected</#if>
                                                            value="${unit.id}">${unit.name}</option>
                                                    </#list>
                                                </#if>
                                            </select>
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="accountType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>被授权者</label>
                                <div class="col-sm-4">
                                    <select name="granteeId" id="granteeId" class="chosen-select"
                                            data-placeholder="请选择">
                                        <option value=""></option>
                                        <span class="block input-icon input-icon-right">
                                            <#if acUnits??>
                                                <#list acUnits as unit>
                                                    <option
                                                        <#if bean.grantee??&&(unit.id == bean.grantee.id)>selected</#if>
                                                        value="${unit.id}">${unit.name}</option>
                                                </#list>
                                            </#if>
	                                    </span>
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
<script src="<@spring.url '/static/js/common/beautify.js' />"></script>
<script src="<@spring.url '/static/js/common/jsonformate.js' />"></script>
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/unitGrant/update.js' />"></script>
</body>
<html>
</#escape>


