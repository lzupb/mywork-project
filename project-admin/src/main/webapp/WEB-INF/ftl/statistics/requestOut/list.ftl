<#include '../../common/common-header.ftl'/>
<body class="no-skin">
<#include '../../common/common-nav.ftl'/>
<div class="main-container" id="main-container">
    <script type="text/javascript">
        try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }
    </script>
    <!-- #section:basics/sidebar -->
<#include '../../common/common-menu.ftl'/>
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
                <li class="active">IDL 调用统计</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <!-- /section:basics/content.breadcrumbs -->
        <div class="page-content">
            <!-- #section:settings.box -->
            <!-- /section:settings.box -->
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="widget-box">
                            <div class="widget-header widget-header-small">
                                <h5 class="widget-title lighter">查询条件</h5>
                            </div>

                            <form id="search-form">
                                <div class="widget-body">
                                    <div class="widget-main-sm">
                                        <div class="row">
                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      开始时间:
                                                  </span>
                                                    <input id="requestTimeFrom" name="beginTime" type="text"
                                                           class="form-control search-form-ipt" style=""
                                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'#F{$dp.$D(\'requestTimeTo\')}'})">
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      结束时间:
                                                  </span>
                                                    <input id="requestTimeTo" name="endTime" type="text"
                                                           class="form-control search-form-ipt"
                                                           style=""
                                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'requestTimeFrom\')}'})">
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      统计维度:
                                                  </span>
                                                    <select name="statisticsGroup" class="chosen-select"
                                                            data-placeholder="请选择统计维度">
                                                        <option value=""></option>
                                                        <option value="all">全部</option>
                                                        <option value="requestUri">接口</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="space-4"></div>
                                        <div class="row">

                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                       统计值:
                                                  </span>
                                                    <input name="statisticsGroupValue" type="text"
                                                           class="form-control search-form-ipt"
                                                           placeholder="请手动输入接口值">
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      统计窗口:
                                                  </span>
                                                    <select name="statisticsInterval" class="chosen-select"
                                                            data-placeholder="请选择统计窗口">
                                                        <option value=""></option>
                                                        <option value="OneMinute">每分钟</option>
                                                        <option value="OneDay">每天</option>
                                                        <option value="OneMonth">每月</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-xs-4 col-lg-4 col-md-4 col-sm-4">
                                                <div class="input-group">
                                                    <button type="button"
                                                            class="search-form-ipt search-form-btn btn btn-purple btn-sm">
                                                        查询
                                                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <button class="cancel-form-btn btn" type="reset">
                                                        重置
                                                        <i class="ace-icon fa fa-undo icon-on-right bigger-110"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.row -->
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- search div end --->
                        <table id="grid-table" style="line-height: 15px;"></table>
                        <div id="grid-pager"></div>
                        <!-- PAGE CONTENT ENDS -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.page-content-area -->
        </div>
        <!-- /.page-content -->
    </div>

    <div class="modal fade" id="statisticsModal" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 800px;height: 550px;">
                <div class="modal-header alert alert-info">
                    <button type="button" class="close"
                            data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        请求统计图表
                    </h4>
                </div>
                <div class="modal-body">
                    <div id="statisticsContainer" style="width: 760px;height: 430px;"></div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal -->
        <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
            <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
        </a>
    </div>
    <!-- /.main-container -->


    <!-- basic scripts -->
<#include "../../common/common-immediate.ftl" />
<#include "../../common/common-import-list.ftl" />
    <link href="" rel="stylesheet">
    <script src="<@spring.url '/static/assets/js/My97DatePicker/WdatePicker.js' />"></script>
    <script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
    <script src="<@spring.url '/static/assets/highstock/highstock.js' />"></script>
    <script src="<@spring.url '/static/js/lib/highchart-utils.js' />"></script>
    <!-- buss js -->
    <script src="<@spring.url '/static/js/buss/statistics/requestOut/list.js'/>"></script>
    <style>
        .input-group-addon {
            min-width: 90px;
            text-align: right;
        }
    </style>
</body>
</html>
