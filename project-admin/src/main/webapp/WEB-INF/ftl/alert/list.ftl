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
                <li class="active">告警列表</li>
            </ul><!-- /.breadcrumb -->
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

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      ne_label
                                                  </span>
                                                    <input name="ne_label" type="text"
                                                           class="form-control search-form-ipt">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      object_class
                                                  </span>
                                                    <input name="object_class" type="text"
                                                           class="form-control search-form-ipt">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      cancel_time为空
                                                  </span>
                                                    <div class="col-sm-4">
                                                        <input value="true" name="cancel_time_is_null" type="checkbox"
                                                               class="ace">
                                                        <span class="lbl"></span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="space-2"></div>

                                        <div class="row">

                                            <div class="col-lg-6">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      event_time
                                                  </span>
                                                    <span class="display:inline-block">
                                                    <input style="height: 30px;max-width: 165px;"
                                                           id="start_event_time"
                                                           name="start_event_time" type="text"
                                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                                         -
                                                        <input style="height: 30px;max-width: 165px;"
                                                               id="end_event_time"
                                                               name="end_event_time" type="text"
                                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                                        </span>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      cancel_time
                                                  </span>
                                                    <span class="display:inline-block">
                                                    <input style="height: 30px;max-width: 165px;"
                                                           id="start_cancel_time"
                                                           name="start_cancel_time" type="text"
                                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                                         -
                                                        <input style="height: 30px;max-width: 165px;"
                                                               id="end_cancel_time"
                                                               name="end_cancel_time" type="text"
                                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                                        </span>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="space-2"></div>

                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="input-group">
                                                    <button type="button"
                                                            class="search-form-ipt search-form-btn btn btn-purple btn-sm">
                                                        Search
                                                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <button class="cancel-form-btn btn" type="reset">
                                                        Reset
                                                        <i class="ace-icon fa fa-undo icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <button id="batch_modify" type="button">
                                                        批量上报
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
    </div><!-- /.main-content -->


    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>

</div><!-- /.main-container -->
<!-- basic scripts -->
<#include "../common/common-immediate.ftl" />
<#include "../common/common-import-list.ftl" />

<script src="<@spring.url '/static/js/lib/moment.js' />"></script>
<script src="<@spring.url '/static/assets/js/My97DatePicker/WdatePicker.js' />"></script>
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/alert/list2.js'/>"></script>


</body>
</html>
