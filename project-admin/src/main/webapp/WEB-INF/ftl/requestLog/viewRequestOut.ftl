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
                <li class="active">IDL请求日志查看</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>


        <div class="page-content">
            <div class="page-content-area" style="padding-left: 10px;">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="widget-body">
                <#if bean??>
                            <div class="profile-contact-links align-left" style="margin-left: 10px;margin-right: 10px;">
                                <a href="/requestLog/viewRequestIn?requestId=${bean.requestId!''}" class="btn btn-link">
                                    <i class="ace-icon fa fa-globe bigger-125 blue"></i> App请求日志
                                </a>
                                &nbsp;&nbsp;
                                <a href="/verifyLog/view?requestId=${bean.requestId!''}" class="btn btn-link">
                                    <i class="ace-icon fa fa-globe bigger-125 blue"></i> 识别日志
                                </a>
                            </div>
                            <div class="widget-main-sm">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              记录ID
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.id!''}<span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                             请求ID
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.requestId!''}<span>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              请求时间
                                          </span>
                                          <span class="form-control search-form-ipt">
                                          <#if bean.requestTime??>
                                          ${bean.requestTime?string('yyyy-MM-dd HH:mm:ss.SSS')!''}
                                          </#if>
                                              <span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              响应时间
                                          </span>
                                          <span class="form-control search-form-ipt">
                                              <#if bean.responseTime??>
                                              ${bean.responseTime?string('yyyy-MM-dd HH:mm:ss.SSS')!''}
                                              </#if><span>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              记录时间
                                          </span>
                                          <span class="form-control search-form-ipt">
                                          <#if bean.createTime??>
                                          ${bean.createTime?string('yyyy-MM-dd HH:mm:ss.SSS')!''}
                                          </#if>
                                              <span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              用时(ms)
                                          </span>
                                          <span class="form-control search-form-ipt">
                                              <#if bean.duration??>
                                              ${bean.duration}
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
                                              源地址
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.requestFrom!''}<span>
                                        </div>
                                    </div>
                                    <div class="col-lg-1">
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                              响应状态
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.status!''}
                                              /${bean.statusDesc!''}<span>
                                        </div>
                                    </div>
                                </div>


                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                          <span class="input-group-addon fix-width-medium">
                                             目标地址
                                          </span>
                                          <span class="form-control search-form-ipt">${bean.requestUri!''}<span>
                                        </div>
                                    </div>
                                </div>

                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                                响应体
                                            </span>
                                            <textarea type="text"
                                                      rows="6"
                                                      class="form-control search-form-ipt">${bean.responseBody!''}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                                请求头
                                            </span>
                                            <textarea type="text"
                                                      rows="4" style="white-space:nowrap; overflow:scroll"
                                                      class="form-control search-form-ipt">${bean.requestHeader!''}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                                请求体
                                            </span>
                                            <textarea type="text"
                                                      rows="8"
                                                      class="form-control search-form-ipt">${bean.requestBody!''}</textarea>
                                        </div>
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
<#else>
    未找到相关信息
</#if>
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
<script src="<@spring.url '/static/js/buss/requestLog/viewRequestOut.js' />"></script>
</body>
<html>


