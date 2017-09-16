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
                <li class="active">设备管理</li>
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
                                <h5 class="widget-title lighter">设备查询</h5>
                            </div>

                            <form id="search-form">
                                <div class="widget-body">
                                    <div class="widget-main-sm">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">名称
                                                  </span>
                                                  <input type="text" id="deviceName" name="deviceName"
	                                              	 class="col-xs-10 col-sm-12" placeholder="名称">
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">APP编码
                                                  </span>
                                                  <input type="text" id="deviceCode" name="deviceCode"
	                                              	 class="col-xs-10 col-sm-12" placeholder="APP编码">
                                                </div>
                                            </div>
                                            

                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                    <button type="button"
                                                            class="search-form-ipt search-form-btn btn btn-purple btn-sm">查询
                                                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="space-4"></div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">组织路径
                                                  </span>
                                                  <input type="text" id="unitCode" name="unitCode"
	                                              	 class="col-xs-10 col-sm-12" placeholder="组织路径">
                                                </div>
                                            </div>
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                  <span class="input-group-addon">位置
                                                  </span>
                                                  <input type="text" id="position" name="position"
	                                              	 class="col-xs-10 col-sm-12" placeholder="位置">
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="input-group">
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
                                                  <span class="input-group-addon">权限
                                                  </span>
			                                    	<select name="deviceGroupIds" id="deviceGroupIds" class="chosen-select"
				                                            data-placeholder="Choose a State..." multiple >
			                                        	<option value=""></option>
					                                        <#list permissions as dg>
						                                            <option value="${dg.id}">${dg.groupName}</option>
					                                        </#list>
				                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="space-4"></div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="input-group">
                                                    <a href="update" target="_blank" class=" btn btn-info btn-sm">新增设备
                                                    <i class="ace-icon fa fa-cog icon-on-right bigger-110"></i>
                                                    </a>
                                                    <a href="#modal-form" id="changeGroups" role="button" data-toggle="modal" class="blue btn btn-info btn-sm">批量更改权限组
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
				<div class="modal-body overflow-visible">
					<div class="row">
						<div class="col-xs-12">
							<div class="form-group">								
								<label for="form-field-select-3" class="col-sm-3 control-label glyphicon" style="padding-left: 37 !important;">
                                    <i class="required-mark"></i>选择设备组</label>
                                <div class="col-sm-4" style="width:50%">
                                    <span class="block input-icon input-icon-right">
										<select id="permissionIds" name="permissionIds" class="chosen-select" data-placeholder="Choose a Country..." multiple>
                                        	<option value=""></option>
										</select>
                                    </span>
                                </div>
							</div>

							<div class="space-4"></div>
						</div>
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
<script src="<@spring.url '/static/js/common/jquery.chosen.ajax.js' />"></script>
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/device/list.js'/>"></script>

</body>
</html>
