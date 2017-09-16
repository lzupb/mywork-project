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
                <li class="active">设备状态管理</li>
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
                                <h5 class="widget-title lighter">设备状态查询</h5>
                            </div>

                            <form id="search-form">
                                <div class="widget-body">
                                    <div class="widget-main-sm">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">设备名称
                                                  </span>
                                                  <input type="text" id="deviceName" name="deviceName"
	                                              	 class="col-xs-10 col-sm-12" placeholder="设备名称">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                    <button type="button"
                                                            class="search-form-ipt search-form-btn btn btn-purple btn-sm">查询
                                                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                                    </button>
                                                    <span class="line-gap-10"></span>
                                                    <button class="cancel-form-btn btn" type="reset">重置
                                                        <i class="ace-icon fa fa-undo icon-on-right bigger-110"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="space-4"></div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                    <a href="#modal-form" id="changeGroups" role="button" data-toggle="modal" class="blue btn btn-info btn-sm">批量操作
                                                    <i class="ace-icon fa fa-cog icon-on-right bigger-110"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.row -->
                                        <div class="space-4"></div>
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

	<div id="modal-form" class="modal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="row">
							<div class="form-group">								
								<label for="form-field-select-3" class="col-sm-3 control-label no-padding-right glyphicon" >
                                    <i class="required-mark"></i>选择指令</label>
                                <div class="col-sm-8">
                                    <span class="block input-icon input-icon-right">
										<select id="commond" name="commond" class="chosen-select" data-placeholder="Choose a Country..." >
                                        	<option value=""></option>
                                        	<#list commands as cs>
                                        		<#if cs.value!='awake' && cs.value!='sleep'>
		                                            <option value="${cs.value}">${cs.desc}</option>
		                                        </#if>
	                                        </#list>
										</select>
                                    </span>
                                </div>
							</div>
							<div class="space-4"></div>
					</div>
					<div class="row">
							<div class="form-group selectVersionDiv">								
								<label for="form-field-select-3" class="col-sm-3 control-label no-padding-right glyphicon" >
                                    <i class="required-mark"></i>选择App版本</label>
                                <div class="col-sm-8">
                                    <span class="block input-icon input-icon-right">
										<select id="version" name="version" class="chosen-select" data-placeholder="Choose a Country..." >
                                        	<option value=""></option>
                                        	<#list versions as v>
		                                            <option value="${v.versionValue}">${v.versionName}</option>
	                                        </#list>
										</select>
                                    </span>
                                </div>
							</div>

							<div class="space-4 selectVersionDiv"></div>
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-sm" data-dismiss="modal">
						<i class="icon-remove"></i>
						取消
					</button>

					<button class="btn btn-sm btn-primary ticketsSelectOk">
						<i class="icon-ok"></i>
						确定
					</button>
				</div>
			</div>
		</div>
	</div>

    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>
</div><!-- /.main-container -->


<!-- basic scripts -->
<#include "../common/common-immediate.ftl" />
<#include "../common/common-import-list.ftl" />

<!-- buss js -->
<script src="<@spring.url '/static/js/buss/deviceStatus/list.js'/>"></script>

</body>
</html>
