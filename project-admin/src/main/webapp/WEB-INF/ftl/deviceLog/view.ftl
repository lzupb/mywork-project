<html>
<#include '../common/common-header.ftl'/>
<#setting datetime_format="yyyy-MM-dd HH:mm:ss.sss"/>
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
                <li class="active">App请求日志查看</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>


        <div class="page-content">
            <div class="page-content-area" style="padding-left: 10px;">
            <div class="row">
            <div class="col-xs-12">
            <div class="widget-body">
            <#if bean??>
            <#--<div class="profile-contact-links align-left" style="margin-left: 10px;margin-right: 10px;">-->
            <#--<a href="/requestLog/viewRequestIn?requestId=${bean.gatewayRequestId!''}"-->
            <#--class="btn btn-link">-->
            <#--<i class="ace-icon fa fa-globe bigger-125 blue"></i> App请求日志-->
            <#--</a>-->
            <#--</div>-->
                <div class="widget-main-sm">
                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">记录ID</span>
                                <span class="form-control search-form-ipt">${bean.id!''}</span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">设备请求ID</span>
                                <span class="form-control search-form-ipt">${bean.deviceReqId!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">日志接收时间</span>
                                <span class="form-control search-form-ipt">
                                    <#if bean.receiveTime??>
                                        ${bean.receiveTime?string('yyyy-MM-dd HH:mm:ss.SSS')!''}
                                    </#if>
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">gateway请求ID</span>
                                <span class="form-control search-form-ipt">${bean.gatewayRequestId!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">识别开始时间</span>
                                <span class="form-control search-form-ipt">${(bean.start?number_to_datetime)!''}</span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">识别用时(ms)</span>
                                <span class="form-control search-form-ipt">${bean.dur!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">质量检测开始时间</span>
                                <span class="form-control search-form-ipt">
                                ${(bean.qualityStart?number_to_datetime)!''}
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">质量检测用时(ms)</span>
                                <span class="form-control search-form-ipt">${bean.qualityDur!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">追踪开始时间</span>
                                <span class="form-control search-form-ipt">
                                ${(bean.trackStart?number_to_datetime)!''}
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">追踪用时(ms)</span>
                                <span class="form-control search-form-ipt">${bean.trackDur!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-1">
                            <span class="input-group-addon fix-width-medium">server请求</span>
                        </div>

                        <div class="col-lg-11">
                            <#if (bean.recList)??>
                                <div class="bd" style="padding: 10px">
                                    <table id="grid-table" class="table table-bordered table-hover">
                                        <thead>
                                        <tr class="blue">
                                            <th>请求id</th>
                                            <th>请求开始时间</th>
                                            <th>请求耗时</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <#list bean.recList as item>
                                            <#--<tr class="<#if item_index%2!=0>even<#else>odd</#if>">-->
                                            <tr>
                                                <td>
                                                    <a href="${springMacroRequestContext.contextPath}/verifyLog/view?requestId=${item.requestId!''}" class="btn btn-link">
                                                        ${(item.requestId)!''}
                                                    </a>
                                                </td>
                                                <td>${(item.start?number_to_datetime)!''}</td>
                                                <td>${(item.dur)!''}</td>
                                            </tr>
                                            </#list>
                                        </tbody>
                                    </table>
                                </div>
                            </#if>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">闸机开门开始时间</span>
                                <span class="form-control search-form-ipt">
                                ${(bean.gateStart?number_to_datetime)!''}
                                </span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">闸机开门用时(ms)</span>
                                <span class="form-control search-form-ipt">${bean.gateDur!''}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">设备</span>
                                <span class="form-control search-form-ipt">${bean.deviceCode!''}  (${(device
                                .deviceName)!'未找到设备名'})</span>
                            </div>
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-5">
                        </div>
                    </div>

                    <div class="space-4"></div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="input-group">
                                <span class="input-group-addon fix-width-medium">请求体</span>
                                <textarea type="text" rows="4"
                                          class="form-control search-form-ipt">${bean.extra!''}</textarea>
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
<script src="<@spring.url '/static/js/buss/deviceLog/view.js' />"></script>
</body>
<html>


