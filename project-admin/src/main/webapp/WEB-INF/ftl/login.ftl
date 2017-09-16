<#include './common/common-header.ftl'/>
<style type="text/css">
    body {
        margin:0;
    }
    video {
        position: fixed;
        right:-20%;
        bottom:0;
        min-width: 100%;
        min-height: 100%;
    }
</style>
<body>

<div class="main-container" id="main-container">
    <div class="main-content">
        <div style="margin-right: 0; margin-left: 0" class="row">
            <video autoplay loop src="<@spring.url '/static/video/banner-1.mp4'/>">

            </video>
            <div class="col-sm-10 col-sm-offset-1">
                <div class="space-32"></div>
                <div class="space-18"></div>

                <div class="login-container">
                    <div class="center">
                        <h1>
                            <i class="ace-icon fa fa-leaf green"></i>
                            <span class="red">SBJK</span>
                            <span class="white" id="id-text2">管理后台</span>
                        </h1>
                        <#--<h4 class="orange" id="id-company-text">©lzupb</h4>-->
                    </div>

                    <div class="space-12"></div>

                    <div class="position-relative">
                        <div id="login-box" class="login-box widget-box no-border">
                            <div style="opacity: 0.8" class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header blue lighter bigger">
                                        <i class="ace-icon fa fa-coffee green"></i>
                                        请输入用户名和密码
                                    </h4>

                                    <div class="space-6"></div>

                                    <form id="loginForm" role="form" method="post"
                                          action="<@spring.url '/loginProcess'/>">
                                        <fieldset style="border: none">
                                            <label class="block clearfix">
                                                <span class="block input-icon input-icon-right">
                                                    <input type="text" class="form-control" name="username"
                                                           placeholder="用户名">
                                                    <i class="ace-icon fa fa-user"></i>
                                                </span>
                                            </label>

                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" name="password"
                                                                   placeholder="密码">
															<i class="ace-icon fa fa-lock"></i>
														</span>
                                            </label>

                                            <div class="space"></div>

                                            <div class="clearfix">
                                            <#--<label class="inline">-->
                                            <#--<input type="checkbox" class="ace">-->
                                            <#--<span class="lbl"> Remember Me</span>-->
                                            <#--</label>-->

                                                <button type="button" id="loginBtn"
                                                        class="width-35 pull-right btn btn-sm btn-primary">
                                                    <i class="ace-icon fa fa-key"></i>
                                                    <span class="bigger-110">登录</span>
                                                </button>
                                            </div>

                                            <div class="space-4"></div>
                                        </fieldset>
                                    </form>

                                <#--<div class="social-or-login center">-->
                                <#--<span class="bigger-110">Or Login Using</span>-->
                                <#--</div>-->

                                <#--<div class="space-6"></div>-->

                                <#--<div class="social-login center">-->
                                <#--<a class="btn btn-primary">-->
                                <#--<i class="ace-icon fa fa-facebook"></i>-->
                                <#--</a>-->

                                <#--<a class="btn btn-info">-->
                                <#--<i class="ace-icon fa fa-twitter"></i>-->
                                <#--</a>-->

                                <#--<a class="btn btn-danger">-->
                                <#--<i class="ace-icon fa fa-google-plus"></i>-->
                                <#--</a>-->
                                <#--</div>-->
                                </div><!-- /.widget-main -->

                            <#--<div class="toolbar clearfix">-->
                            <#--<div>-->
                            <#--<a href="#" data-target="#forgot-box" class="forgot-password-link">-->
                            <#--<i class="ace-icon fa fa-arrow-left"></i>-->
                            <#--I forgot my password-->
                            <#--</a>-->
                            <#--</div>-->

                            <#--<div>-->
                            <#--<a href="#" data-target="#signup-box" class="user-signup-link">-->
                            <#--I want to register-->
                            <#--<i class="ace-icon fa fa-arrow-right"></i>-->
                            <#--</a>-->
                            <#--</div>-->
                            <#--</div>-->
                            </div><!-- /.widget-body -->
                        </div><!-- /.login-box -->
                    </div><!-- /.position-relative -->

                <#--<div class="navbar-fixed-top align-right">-->
                <#--<br>-->
                <#--&nbsp;-->
                <#--<a id="btn-login-dark" href="#">Dark</a>-->
                <#--&nbsp;-->
                <#--<span class="blue">/</span>-->
                <#--&nbsp;-->
                <#--<a id="btn-login-blur" href="#">Blur</a>-->
                <#--&nbsp;-->
                <#--<span class="blue">/</span>-->
                <#--&nbsp;-->
                <#--<a id="btn-login-light" href="#">Light</a>-->
                <#--&nbsp; &nbsp; &nbsp;-->
                <#--</div>-->
                </div>
            </div><!-- /.col -->
        </div>

    </div><!-- /.main-content -->
</div><!-- /.main-container -->

<#include "./common/common-immediate.ftl" />
<#include "./common/common-import-update.ftl" />
<!-- user scripts -->
<script src="<@spring.url '/static/js/common/common.js' />"></script>
<script src="<@spring.url '/static/js/buss/login.js' />"></script>

<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function ($) {
        $(document).on('click', '.toolbar a[data-target]', function (e) {
            e.preventDefault();
            var target = $(this).data('target');
            $('.widget-box.visible').removeClass('visible');//hide others
            $(target).addClass('visible');//show target
        });
    });
</script>

</body>
</html>