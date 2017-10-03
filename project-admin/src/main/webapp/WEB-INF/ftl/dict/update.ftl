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
                <li class="active">字典添加</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal" action="<@spring.url '/dict/updateData.json'/>" method="post">
                            <input type="hidden" name="id" value="${bean.id!''}" />

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right glyphicon"><i class="required-mark"></i>字典名</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input maxlength="255" required type="text"  name="dictKey" value="${bean.dictKey!''}" class="col-xs-10 col-sm-12" placeholder="字典名">
                                    </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i class="required-mark"></i>字典值 </label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" required type="text" name="dictValue"  value="${bean.dictValue!''}" class="col-xs-10 col-sm-12" placeholder="字典值">
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"> 启用字典 </label>
                                <div class="col-sm-4">
                                        <input value="true" name="enable" <#if (bean.enable)??&&(bean.enable)>checked="checked" </#if> type="checkbox" class="ace">
                                        <span class="lbl"></span>
                                </div>
                            </div>
                            <div class="space-4"></div>

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"> 字典描述 </label>
                                <div class="col-sm-4">
                                        <textarea maxlength="10000" name="description"  class="autosize-transition
                                        form-control">${bean.description!""}</textarea>
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
<script src="<@spring.url '/static/js/buss/dict/update.js' />"></script>
</body>
<html>


