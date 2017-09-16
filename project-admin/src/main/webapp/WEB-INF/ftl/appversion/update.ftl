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
                <li class="active">App版本添加（修改）</li>
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
                                    <i class="required-mark"></i>版本</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="versionValue" required name="versionValue"
                                               value="${bean
                                        .versionValue!''}"
                                               class="col-xs-10 col-sm-12" placeholder="版本">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="authName" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>版本名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="versionName" required name="versionName" value="${bean
                                        .versionName!''}"
                                               class="col-xs-10 col-sm-12" placeholder="版本名称">
                                    </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>密钥</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="encryptionKey" required name="encryptionKey" value="${bean
                                        .encryptionKey!''}"
                                               class="col-xs-10 col-sm-12" placeholder="密钥">
                                    </span>
                                </div>
                                <button id="genKey" class="btn-grey" type="button">
                                    <i class="ace-icon fa fa-bars bigger-110"></i>
                                    生成密钥
                                </button>
                            </div>

                            <div class="form-group">
                                <label for="roles" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>启用</label>

                                <div class="col-lg-4">
                                    <select required name="status" id="status" class="chosen-select search-form-ipt"
                                            data-placeholder="是否启用">
                                        <#list status as b >
                                            <option value="${b.name()!}">${b.desc!}</option>
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
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/appversion/update.js' />"></script>
</body>
<html>


