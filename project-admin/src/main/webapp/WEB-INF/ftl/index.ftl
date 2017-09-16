<#include './common/common-header.ftl'/>
<body class="no-skin">
<#include './common/common-nav.ftl'/>
<div class="main-container" id="main-container">
<#--<script type="text/javascript">-->
<#--try {-->
<#--ace.settings.check('main-container', 'fixed')-->
<#--} catch (e) {-->
<#--}-->
<#--</script>-->
    <!-- #section:basics/sidebar -->
<#include './common/common-menu.ftl'/>
    <!-- /section:basics/sidebar -->
    <div class="main-content">
        <!-- #section:basics/content.breadcrumbs -->
        <div class="breadcrumbs" id="breadcrumbs">
        <#--<script type="text/javascript">-->
        <#--try {-->
        <#--ace.settings.check('breadcrumbs', 'fixed')-->
        <#--} catch (e) {-->
        <#--}-->
        <#--</script>-->

            <ul class="breadcrumb" style="margin-top: 11px">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="<@spring.url '/'/>">SBJK系统</a>
                </li>
                <li class="active">首页</li>
            </ul><!-- /.breadcrumb -->
        </div>

        <!-- /section:basics/content.breadcrumbs -->
        <div class="page-content">
            <div class="page-content-area">

                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="alert alert-block alert-success">
                            <button type="button" class="close" data-dismiss="alert">
                                <i class="ace-icon fa fa-times"></i>
                            </button>

                            <i class="ace-icon fa fa-check green"></i>

                            您好,
                            <strong class="green">
                            <@security.authentication property="principal.username"/>
                                <small></small>
                            </strong>,
                            欢迎使用SBJK系统.<br/>
                        </div>
                        <!-- PAGE CONTENT ENDS -->
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.page-content-area -->
        </div><!-- /.page-content -->
    </div><!-- /.main-content -->


    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
    </a>
</div><!-- /.main-container -->


<!-- basic scripts -->

<!-- basic scripts -->
<#include "./common/common-immediate.ftl" />
<#include "./common/common-import.ftl" />
<!-- user scripts -->
<script src="<@spring.url '/static/js/common/common.js' />"></script>

</body>
</html>