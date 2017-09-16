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
                <li class="active">组织管理</li>
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
                                <label for="accountType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>名称</label>

                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
	                                        <input type="text" readonly id="name" name="name" value="${bean.name!''}"
                                                   class="col-xs-10 col-sm-12" placeholder="名称">
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="unitType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>组织类型</label>
                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
	                                    	<select name="types" id="types" class="chosen-select"
                                                    data-placeholder="Choose a State..." multiple>
		                                            <option value="">请选择</option>
                                                <#list unitTypes as uts>
                                                    <option <#if hastypes??><#list hastypes as hts><#if hts==uts.type>selected</#if></#list></#if>
                                                            value="${uts.type}">${uts.text}</option>
                                                </#list>
		                                    </select>
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="accountType" class="col-sm-3 control-label no-padding-right glyphicon">
                                    父级组织</label>

                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
	                                    	<select name="parentId" id="parentId" class="chosen-select"
                                                    data-placeholder="Choose a State...">
		                                            <option value="">请选择</option>
                                                <#list parents as u>
                                                    <option <#if bean.parent??><#if bean.parent.id==u.id>selected</#if></#if>
                                                            code="${u.unitCode}" value="${u.id}">${u.name}</option>
                                                </#list>
		                                    </select>
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="parentUnitCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>组织编码</label>

                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
	                                    	
	                                        <input type="text" id="parentUnitCode" name="parentUnitCode" readonly
                                                   value="<#if bean.parent??>${bean.parent.unitCode!''}</#if>"
                                                   class="col-xs-5 col-sm-6">
	                                        <input type="text" id="unitCode" name="unitCode"
                                                   value="<#if code??>${code!''}</#if>"
                                                   <#if bean.id??>readonly</#if> class="col-xs-5 col-sm-6"
                                                   placeholder="组织编码">
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="companyCode" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>company编码</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <select name="companyCode" id="companyCode" class="chosen-select"
                                                data-placeholder="Choose a State...">
                                            <#list companys as company>
                                                <option
                                                    <#if bean.companyCode?? && bean.companyCode==company.code>selected</#if>
                                                    value="${company.code}">${company.name}</option>
                                            </#list>
	                                    </select>
                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>

                            <div class="form-group">
                                <label for="idlApiAccountId" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>idl账号</label>

                                <div class="col-sm-4">
	                                    <span class="block input-icon input-icon-right">
	                                    	<select name="idlApiAccountId" id="idlApiAccountId" class="chosen-select"
                                                    data-placeholder="Choose a State...">
                                                <#list idlApiAccounts as ias>
                                                    <option <#if bean.idlApiAccount??><#if bean.idlApiAccount.id==ias.id>selected</#if></#if>
                                                            value="${ias.id}">${ias.name}</option>
                                                </#list>
		                                    </select>
	                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right">
                                    <i class="required-mark"></i> 基本配制
                                </label>
                                <div class="col-sm-4">
                                    <div class="checkbox">
                                        <div id="formatJson" class="btn btn-xs btn-danger"> &nbsp;格式化显示 &nbsp;</div>
                                        &nbsp;
                                        <div id="fommatCompact" class="btn btn-xs btn-info"> &nbsp;&nbsp;紧凑显示 &nbsp;&nbsp;</div>
                                        <div id="jsonTipMessage" style="padding-right: 20px;"
                                             class="inline-right error-message"></div>
                                        <br/>
                                        <textarea maxlength="2000" id="configText" name="config" cols="40" rows="11"
                                                  placeholder="基本配制"
                                                  class="autosize-transition form-control"><#if bean??&&bean.id??>
                                        ${bean.config!""}
                                        <#else>{
    "server": {
        "rec": {
            "identify_pass_score": "90",
            "active_pass_score": "0.00001",
            "match_pass_score": "90",
            "identify_interval": 30,
            "detect": {
                "occlusion": 0.8,
                "blur": 0.7,
                "illumination": 30,
                "completeness": 0.4
             }
         }


    },
    "app": {
        "workBegin": "08:00:00",
        "workEnd": "23:59:59"
    }
}</#if></textarea>
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
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/unit/update.js' />"></script>
</body>
<html>
</#escape>


