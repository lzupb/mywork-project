<#include './common/common-header.ftl'/>
<body class="no-skin">

<#include './common/common-nav.ftl'/>

<style type="text/css">

    .overview {
        min-width: 900px;
        color: #3333;
        line-height: 1.5em
        font-style: normal;
        font-weight: normal;
        padding-top: 8px;
    }

    .overview div, h2 {
        font-family: 'Microsoft YaHei', 'lucida grande', helvetica, verdana, arial, sans-serif;
    }

    .overview ol, ul {
        list-style: none;
    }

    .overview h2 {
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 0 0 20px;
        color: inherit;
        font-size: 16px;
        font-style: inherit;
        font-weight: inherit;

    }

    .overview .line-pad {
        background-color: #e5e5e5;
        height: 1px;
        display: block;
        margin: 8px 0;
    }

    .over-title {
        margin-bottom: 10px;
    }

    .item-main {
        font-size: 26px;
        color: #2CB663;
    }

    .item-unit {
        color: #999;
    }

    .item-label {
        color: #999;
        font-size: 14px;
        margin-right: 3px;
    }

    .item-wrapper {
        border-right: 1px solid #e5e5e5;
    }

    .last-col-pad {
        padding-right: 0;
    }

    .alert-title {
        cursor: pointer;
        color: #1B6AAA
    }

    .pie-container {
        border: 1px solid #e5e5e5;
        min-width: 400px;
        height: 300px;
    }

    .graph-container {
        border: 1px solid #e5e5e5;
        min-width: 400px;
        height: 360px;
    }
</style>


<div class="main-container" id="main-container">
    <!-- #section:basics/sidebar -->
<#include './common/common-menu.ftl'/>
    <!-- /section:basics/sidebar -->
    <div class="main-content">
        <!-- #section:basics/content.breadcrumbs -->
        <div class="breadcrumbs" id="breadcrumbs">
            <ul class="breadcrumb" style="margin-top: 11px">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="<@spring.url '/'/>">通用人脸识别闸机系统</a>
                </li>
                <li class="active">服务概览</li>
            </ul><!-- /.breadcrumb -->
        </div>

        <!-- /section:basics/content.breadcrumbs -->
        <div class="overview">
        <#--<div class="over-title">-->
        <#--<h2>服务概况</h2>-->
        <#--</div>-->
            <div class="col-lg-3 col-md-3  col-sm-3">
                <ul class="item-wrapper">
                    <li>
                    <#--<span class="item-label">公司总数</span>-->
                        <span class="item-main">${unitTotalCount}</span>
                        <span class="item-unit">个</span>
                    </li>
                    <li>
                            <span class="item-label">接入公司数量
                            <i title="截止目前，系统接入的公司总数量"
                               class="alert-title ace-icon fa fa-info-circle"></i>
                            </span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3  col-sm-3">
                <ul class="item-wrapper">
                    <li>
                    <#--<span class="item-label">用户总数</span>-->
                        <span class="item-main">${visitorTotalCount}</span>
                        <span class="item-unit">人</span>
                    </li>
                    <li>
                            <span class="item-label">注册用户总数
                            <i title="截止目前，系统注册的用户总数量"
                               class="alert-title ace-icon fa fa-info-circle"></i>
                            </span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3  col-sm-3">
                <ul class="item-wrapper">
                    <li>
                    <#--<span class="item-label">设备总数</span>-->
                        <span class="item-main">${deviceTotalCount}</span>
                        <span class="item-unit">台</span>
                    </li>
                    <li>
                            <span class="item-label">登记设备总数
                                <i title="截止目前，系统登记的设备总数量"
                                   class="alert-title ace-icon fa fa-info-circle"></i>
                            </span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3  col-sm-3">
                <ul class="last-col-pad">
                    <li>
                    <#--<span class="item-label">设备总数</span>-->
                        <span class="item-main">${verifyTotalCount}</span>
                        <span class="item-unit">次</span>
                    </li>
                    <li>
                            <span class="item-label">累计识别次数
                            <i title="截止目前，系统接收到的识别请求总次数"
                               class="alert-title ace-icon fa fa-info-circle"></i>
                            </span>
                    </li>
                </ul>
            </div>
            <div class="col-lg-12 col-md-12  col-sm-12 line-pad" style="">
            <#--<h2>数据分布</h2>-->
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div id="container" class="pie-container"></div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div id="container2" class="pie-container"></div>
            </div>

        <#--<div class="over-title">-->
        <#--<h2>注册/识别趋势</h2>-->
        <#--</div>-->
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div id="container-axes" class="graph-container" style="margin-top: 8px"></div>
            </div>

        </div><!-- /.page-content -->
    </div><!-- /.main-content -->

</div><!-- /.main-container -->


<!-- basic scripts -->

<!-- basic scripts -->
<#include "./common/common-immediate.ftl" />
<#include "./common/common-import.ftl" />
<!-- user scripts -->
<script src="<@spring.url '/dep/js/highcharts/highcharts.js' />"></script>
<script src="<@spring.url '/dep/js/highcharts/modules/exporting.js' />"></script>
<script src="<@spring.url '/dep/js/highcharts/themes/grid-light.js' />"></script>
<script src="<@spring.url '/static/js/common/common.js' />"></script>
<script src="<@spring.url '/static/js/common/highcharts.helper.js' />"></script>
<script src="<@spring.url '/static/js/buss/overview.js' />"></script>

</body>
</html>