<#import "/spring.ftl" as spring />
<#assign security=JspTaglibs["/WEB-INF/tld/security.tld"] />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta name="description" content="sms-admin"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
<meta charset="utf-8"/>
<title>SBJK</title>
<script type="text/javascript">
    Env = {context: "${springMacroRequestContext.contextPath}"};
</script>

<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="<@spring.url '/static/assets/css/bootstrap.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/font-awesome.css' />"/>

<!-- page specific plugin styles -->
<link rel="stylesheet" href="<@spring.url '/static/assets/css/jquery-ui.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/datepicker.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ui.jqgrid.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/chosen.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/css/select2.css' />"/>


<!-- text fonts -->
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace-fonts.css' />"/>

<!-- ace styles -->
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace.css" id="main-ace-style' />"/>

<!--[if lte IE 9]>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace-part2.css' />"/>
<![endif]-->
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace-skins.css' />"/>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace-rtl.css' />"/>

<!--[if lte IE 9]>
<link rel="stylesheet" href="<@spring.url '/static/assets/css/ace-ie.css' />"/>
<![endif]-->

<!-- diy css -->
<link rel="stylesheet" href="<@spring.url '/static/css/common.css' />"/>

<style type="text/css">
    html, body {
        font-size: 75%;
    }

    #main-container {
        height: 100%;
        padding-top: 45px;
    }
</style>

<!-- inline styles related to this page -->

<!-- ace settings handler -->
<script src="<@spring.url '/static/assets/js/ace-extra.min.js' />"></script>

<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->

<!--[if lte IE 8]>
<script src="<@spring.url '/static/assets/js/html5shiv.js' />"></script>
<script src="<@spring.url '/static/assets/js/respond.js' />"></script>
<![endif]-->
<link rel="stylesheet" href="<@spring.url '/static/css/lib/validate/screen.css' />"/>