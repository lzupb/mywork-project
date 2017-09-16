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
                <li>
                    <a href="<@spring.url '/visitor/list'/>">游客管理</a>
                </li>
                <li class="active">游客详情</li>
            </ul>
            <!-- /.breadcrumb -->
        </div>

        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <form id="submitForm" role="form" class="form-horizontal"
                              action="<@spring.url '/visitor/updateData.json'/>" method="post">
                            <input type="hidden" name="id" value="${bean.id!''}"/>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>组织编号</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" required type="text" name="unitCode"
                                                   value="${bean.unitCode!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="请填写组织的编号">
                                        </span>
                                </div>
                            </div>


                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right glyphicon"><i
                                        class="required-mark"></i>游客编号</label>
                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input maxlength="255" required type="text" name="visitorCode" value="${bean.visitorCode!''}"
                                               class="col-xs-10 col-sm-12" placeholder="请填写游客编号">
                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="name" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>游客名称</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="visitorName" name="visitorName" value="${bean.visitorName!''}"
                                               class="col-xs-10 col-sm-12" placeholder="请填写游客名称">
                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="name" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>IDL存储编号</label>

                                <div class="col-sm-4">
                                    <span class="block input-icon input-icon-right">
                                        <input type="text" id="visitorUucode" name="visitorUucode" value="${bean.visitorUucode!''}"
                                               class="col-xs-10 col-sm-12" placeholder="IDL存储编号">
                                    </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="cardId" class="col-sm-3 control-label no-padding-right glyphicon">
                                    <i class="required-mark"></i>证件类型</label>

                                <div class="col-sm-4">
                                <#list cardTypeList as b>
                                    <div class="radio visitorCardType" style="display:inline;float:left;">
                                        <label>
                                            <input name="visitorCardType" value="${b.code}" type="radio"
                                                   class="ace"
                                                   <#if bean?? && bean.visitorCardType?? && bean.visitorCardType.code==b.code>checked</#if>/>
                                            <span class="lbl">${b.desc}</span>
                                        </label>
                                    </div>
                                </#list>
                                </div>
                            </div>
                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right"><i
                                        class="required-mark"></i>证件编号</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" required type="text" name="cardNumber"
                                                   value="${bean.cardNumber!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="证件编号">
                                        </span>
                                </div>
                            </div>

                            <div class="space-4"></div>
                            <div class="form-group">
                                <label for="form-field-1" class="col-sm-3 control-label no-padding-right">手机号</label>
                                <div class="col-sm-4">
                                        <span class="block input-icon input-icon-right">
                                            <input maxlength="255" required type="text" name="mobile"
                                                   value="${bean.mobile!''}" class="col-xs-10 col-sm-12"
                                                   placeholder="请填写手机号">
                                        </span>
                                </div>
                            </div>
                            <div class="space-4"></div>
                        <#if bean??&&bean.id??>
                            <div class="form-group">
                                <div class="col-lg-8">

                                    <div class="col-lg-5">
                                        <div class="row">
                                            <span class="input-group-addon fix-width-medium">
                                              最新照片
                                            </span>
                                        </div>
                                        <div class="space-4"></div>
                                        <div class="row">
                                            <#if bean?? && bean.userPhoto??>
                                                <img src="<@spring.url '/file/image/'/>${bean.userPhoto!''}"
                                                     class="col-sm-12"></img>
                                            </#if>
                                        </div>
                                    </div>

                                    <div class="col-lg-5">
                                        <div class="row">
                                            <span class="input-group-addon fix-width-medium">
                                              IDL照片
                                            </span>
                                        </div>
                                        <div class="space-4"></div>
                                        <div class="row">
                                            <#if bean?? && bean.idlPhoto??>
                                                <img src="<@spring.url '/file/image/'/>${bean.idlPhoto!''}"
                                                     class="col-sm-12"></img>
                                            </#if>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </#if>
                            <div class="space-4"></div>

                            <div class="clearfix form-actions">
                                <div class="col-md-offset-3 col-md-9">
                                    <span class="line-gap-15"></span>
                                    <button id="cancelBtn" class="btn btn-info btn-warning" type="reset">
                                    <#if bean??&&bean.id??>
                                        <i class="ace-icon fa fa-times"></i>
                                        关 闭
                                    <#else>
                                        <i class="ace-icon fa fa-arrow-left icon-on-left"></i>
                                        返回
                                    </#if>
                                    </button>
                                </div>
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
<!-- buss js -->
<script src="<@spring.url '/static/js/buss/visitor/update.js' />"></script>
</body>
</html>


