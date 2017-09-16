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
                <li class="active">识别日志详情</li>
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
                                <a href="/requestLog/viewRequestOut?requestId=${bean.requestId!''}" class="btn btn-link">
                                    <i class="ace-icon fa fa-globe bigger-125 blue"></i> IDL调用日志
                                </a>
                            </div>
                            <div class="widget-main-sm">
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              请求ID
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${bean.requestId!''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              游客
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            <#if bean.visitorName??>
                                            ${bean.visitorName!''}(${bean.visitorUucode!''})
                                            <#else>
                                            ${bean.visitorUucode!''}
                                            </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              相似度
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${((bean.scores)?string("##0.0000000"))!''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              活体检测
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            <#if bean.livingCheck?? && bean.livingCheck>
                                                开启
                                            <#else>
                                                未开启
                                            </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                            <#if bean.livingCheck?? && bean.livingCheck>
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              活体得分
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${((bean.livingScores)?string("##0.0000000"))!''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              活体状态
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${(bean.livingResult?string("正常","异常"))!''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>
                            </#if>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              判断结果
                                            </span>
                                            <span class="form-control search-form-ipt">
                                                ${(bean.valid?string("正确","错误"))!''}
                                                <#if bean.message??>
                                                    (${bean.message!''})
                                                </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              组织名称
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            <#if bean.unitName??>
                                            ${bean.unitName!''}(${bean.unitCode!''})
                                            <#else>
                                            ${bean.unitCode!''}
                                            </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              设备名称
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            <#if bean.deviceName??>
                                            ${bean.deviceName!''}(${bean.deviceCode!''})
                                            <#else>
                                            ${bean.deviceCode!''}
                                            </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              识别时间
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            ${bean.requestTime?string('yyyy-MM-dd HH:mm:ss.SSS')!''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                              识别类型
                                            </span>
                                            <span class="form-control search-form-ipt">
                                            <#if bean.verifyType??>
                                                <#if bean.verifyType=="1_N">
                                                    1：N识别
                                                <#else>
                                                    1：1识别
                                                </#if>
                                            </#if>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                                注册图片
                                            </span>

                                            <div class="col-sm-5">
                                                <img src="<@spring.url '/file/image/'/>${bean.idlPhoto!''}"
                                                     class="col-sm-12"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>

                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="input-group">
                                            <span class="input-group-addon fix-width-medium">
                                                识别图片
                                            </span>

                                            <div class="col-sm-5">
                                                <img src="<@spring.url '/file/image/'/>${bean.requestPhoto!''}"
                                                     class="col-sm-12"></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-4"></div>


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
<#else>
    未找到相关信息
</#if>
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
<script src="<@spring.url '/static/js/buss/verifyLog/view.js' />"></script>
</body>
<html>


