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
                <li class="active">票务管理</li>
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
                                                    <span class="input-group-addon">组织</span>
                                                    <select name="unitCode" id="unitCode" class="chosen-select"
                                                            data-placeholder="请选择组织">
                                                        <option value=""></option>
                                                    <#list units as unit>
                                                        <option value="${unit.unitCode}">${unit.name}</option>
                                                    </#list>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      userId
                                                  </span>
                                                    <input name="visitorCode" type="text" id="visitorCode"
                                                           class="form-control search-form-ipt">
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      票日期范围
                                                  </span>
                                                    <span class="display:inline-block">
                                                    <input style="height: 30px;max-width: 165px;"
                                                           id="startTime"
                                                           name="startTime" type="text"
                                                           onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" />
                                                         -
                                                        <input style="height: 30px;max-width: 165px;"
                                                               id="endTime"
                                                               name="endTime" type="text"
                                                               onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
                                                        </span>
                                                </div>
                                            </div>


                                        </div>
                                        <div class="space-2"></div>
                                        <div class="row">

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      票订单号
                                                  </span>
                                                    <input name="orderCode" type="text" id="orderCode"
                                                           class="form-control search-form-ipt">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">
                                                      票务code
                                                  </span>
                                                    <input name="ticketCode" type="text" id="ticketCode"
                                                           class="form-control search-form-ipt">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                    <button type="button"
                                                            class="search-form-ipt search-form-btn btn btn-purple btn-sm">
                                                        查询
                                                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <button class="cancel-form-btn btn" type="reset">
                                                        清空
                                                        <i class="ace-icon fa fa-undo icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <a href="add" target="_blank"
                                                       class=" btn btn-info btn-sm">
                                                        购票<i
                                                            class="ace-icon fa fa-cog icon-on-right bigger-110"></i>
                                                    </a>
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
<script src="<@spring.url '/static/js/buss/ticket/list.js'/>"></script>

</body>
</html>
