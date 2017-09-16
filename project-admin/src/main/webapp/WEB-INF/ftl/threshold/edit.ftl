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
                <li class="active">阈值管理</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal"
                              action="<@spring.url '/threshold/updateData.json'/>" method="post">

                            <input type="hidden" name="register.id" value="${register.id!''}"/>
                            <input type="hidden" name="register.dictKey" value="${register.dictKey!''}">
                            <input type="hidden" name="register.dictType" value="${register.dictType!''}">
                            <input type="hidden" name="register.enable" value="true">
                            <input type="hidden" name="register.description" value="注册阈值">

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>注册阈值[0-100]</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" pattern="[0-9]{2}|[1][0-9]{2}" required type="text"
                                                   name="register.dictValue"
                                                   value="${register.dictValue!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="注册阈值">
                                        </span>
                                </div>
                            </div>

                            <input type="hidden" name="verify.id" value="${verify.id!''}"/>
                            <input type="hidden" name="verify.dictKey" value="${verify.dictKey!''}">
                            <input type="hidden" name="verify.dictType" value="${verify.dictType!''}">
                            <input type="hidden" name="verify.enable" value="true">
                            <input type="hidden" name="verify.description" value="通行阈值">

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>通行阈值[0-100]</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" pattern="^(0|100|[1-9]{1}\d?)$" required type="text"
                                                   name="verify.dictValue"
                                                   value="${verify.dictValue!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="通行阈值">
                                        </span>
                                </div>
                            </div>

                            <input type="hidden" name="active.id" value="${active.id!''}"/>
                            <input type="hidden" name="active.dictKey" value="${active.dictKey!''}">
                            <input type="hidden" name="active.dictType" value="${active.dictType!''}">
                            <input type="hidden" name="active.enable" value="true">
                            <input type="hidden" name="active.description" value="活体阈值">

                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>活体阈值[0-1]</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" pattern="1|0|0[.]([0-9]+)$" required type="text"
                                                   name="active.dictValue"
                                                   value="${active.dictValue!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="活体阈值">
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>


                            <div class="clearfix form-actions">
                                <div class="col-md-offset-3 col-md-9">
                                    <button id="submitBtn" class="btn btn-info" type="button">
                                        <i class="ace-icon fa fa-floppy-o bigger-110"></i>
                                        保 存
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
<script src="<@spring.url '/static/js/buss/threshold/edit.js' />"></script>
</body>
<html>


