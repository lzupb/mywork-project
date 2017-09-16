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
    <style type="text/css">
        .fix-width-medium {
            min-width: 100px;
        }
    </style>
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
                <li class="active">售票日志详情</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>


        <div class="page-content">
            <div class="page-content-area" style="padding-left: 10px;">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="widget-body">
                            <div class="widget-main-sm">

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              请求ID
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${bean.requestId!''}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                             保存时间
                                          </span>
                                            <span class="form-control search-form-ipt">
                                              <#if bean.createdDate??>
                                              ${bean.createdDate?string('yyyy-MM-dd HH:mm:ss')!''}
                                              </#if>
                                                  <span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              组织编号
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.unitCode!''}<span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              游客编号
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.visitorUucode!''}<span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>


                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              订单编号
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.orderCode!''}<span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              票务编号
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.ticketCode!''}<span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                             开始时间
                                          </span>
                                            <span class="form-control search-form-ipt">
                                              <#if bean.startTime??>
                                              ${bean.startTime?string('yyyy-MM-dd HH:mm:ss')!''}
                                              </#if>
                                                  <span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                             结束时间
                                          </span>
                                            <span class="form-control search-form-ipt">
                                              <#if bean.endTime??>
                                              ${bean.endTime?string('yyyy-MM-dd HH:mm:ss')!''}
                                              </#if>
                                                  <span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-10">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              分组信息
                                          </span>
                                            <textarea maxlength="255" name="description" cols="15" rows="11"
                                                      class="autosize-transition form-control">${bean.groupInfo!""}</textarea>
                                        </div>
                                    </div>
                                </div>


                                <div class="space-4"></div>
                                <div class="row">

                                    <div class="col-lg-1">
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div class="space-4"></div>
                <div class="clearfix form-actions">
                    <div class="col-md-offset-5 col-md-9">
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
<script src="<@spring.url '/static/js/buss/ticketLog/view.js' />"></script>
</body>
<html>


