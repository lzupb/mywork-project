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
                <li class="active">用户添加</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal" method="post">
                            <input id="id" type="hidden" name="id" value="${bean.id!''}"/>
                            <input id="scenicId" type="hidden" name="scenic.id" value="${(bean.scenic.id)!''}"/>
                            <input type="hidden" name="createdBy" value="${(bean.createdBy)!''}"/>
                            <input type="hidden" name="createdDate"
                                   value="${(bean.createdDate?string("yyyy-MM-dd HH:mm:ss"))!''}"/>

                            <div class="form-group">
                                <label for="loginName" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>登录名</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="loginName" name="loginName" value="${bean.loginName!''}"
                                               class="col-xs-10 col-sm-12" placeholder="登录名">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>密码</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="password" name="password" value="${bean.password!''}"
                                               class="col-xs-10 col-sm-12" placeholder="密码">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="username" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>员工名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="username" name="username" value="${bean.username!''}"
                                               class="col-xs-10 col-sm-12" placeholder="员工名称">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="phone" class="col-sm-3 control-label no-padding-right glyphicon">
                                    手机号</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="phone" name="phone" value="${bean.phone!''}"
                                               class="col-xs-10 col-sm-12" placeholder="手机号">
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="cardId" class="col-sm-3 control-label no-padding-right glyphicon">
                                    身份证</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="cardId" name="cardId" value="${bean.cardId!''}"
                                               class="col-xs-10 col-sm-12" placeholder="身份证">
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="employeeId" class="col-sm-3 control-label no-padding-right glyphicon">
                                    员工编号</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="employeeId" name="employeeId" value="${bean.employeeId!''}"
                                               class="col-xs-10 col-sm-12" placeholder="员工编号">
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="status" class="col-sm-3 control-label no-padding-right glyphicon">
                                    状态</label>

                                <div class="col-sm-4">
                                    <select name="status" id="status" class="chosen-select" data-placeholder="请选择状态">
                                    <#list statusList as b >
                                        <option
                                            <#if bean?? && bean.status?? && bean.status.name()==b.name()>selected</#if>
                                            value="${b.name()}">
                                            <#if b.name()=="True" >有效<#else>无效</#if>
                                        </option>
                                    </#list>
                                    </select>
                                </div>
                            </div>
                        <#--<div class="form-group">-->
                        <#--<label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">-->
                        <#--角色</label>-->

                        <#--<div class="col-lg-4">-->
                        <#--<select multiple="multiple" name="roleIdList" id="roleIdList"-->
                        <#--data-placeholder="请选择角色"-->
                        <#--class="chosen-select">-->
                        <#--<#if bean??&&bean.roles??>-->
                        <#--<#list bean.roles as b >-->
                        <#--<option selected value="${b.id}">${b.label!}[${b.name!}]</option>-->
                        <#--</#list>-->
                        <#--</#if>-->
                        <#--</select>-->
                        <#--</div>-->
                        <#--</div>-->

                            <div class="form-group">
                                <label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">
                                    角色</label>

                                <div class="col-lg-4">
                                    <select name="roleIdList" id="roleIdList" data-placeholder="请选择角色"
                                            class="chosen-select">
                                    <#list roleList as b >
                                        <option
                                            <#if (bean?? && bean.roles?? && bean.roles[0].id==b.id)>selected</#if>
                                            value="${b.id}">${b.label!}[${b.name!}]
                                        </option>
                                    </#list>
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
<script src="<@spring.url '/static/js/buss/user/update.js' />"></script>
</body>
<html>


