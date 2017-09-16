<#import "/spring.ftl" as spring/>
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        html, body {
            height: 100%;
        }
    </style>
<#include '../common/common-header.ftl'>
    <link rel="stylesheet" href="<@spring.url '/static/css/nav.css'/>"/>
</head>
<body class="no-skin" style="height:100%;width:100%;">
<div style="height:100%;width:100%;">
    <div style="width:100%;height:99%;padding:0px;padding-top: 45px;">
        <div class="error-container">
            <div class="well">
                <h1 class="grey lighter smaller">
											<span class="blue bigger-125">
												<i class="ace-icon fa fa-random"></i>
												500
											</span>
                    系统繁忙
                </h1>

                <hr />
                <h3 class="lighter smaller">
                    我们正在排查
                    <i class="ace-icon fa fa-wrench icon-animated-wrench bigger-125"></i>
                </h3>

                <div class="space"></div>

                <div>
                    <h4 class="lighter smaller">你可以尝试以下其它操作:</h4>

                    <ul class="list-unstyled spaced inline bigger-110 margin-15">
                        <li>
                            <i class="ace-icon fa fa-hand-o-right blue"></i>
                            详细读下faq
                        </li>

                        <li>
                            <i class="ace-icon fa fa-hand-o-right blue"></i>
                            联系我们: admin
                        </li>
                    </ul>
                </div>

                <hr />
                <div class="space"></div>

                <div class="center">
                    <a href="javascript:history.back()" class="btn btn-grey">
                        <i class="ace-icon fa fa-arrow-left"></i>
                        返回
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<@spring.url '/static/js/common/require-config.js'/> "></script>
<script src="<@spring.url '/static/js/lib/require-2.1.20-min.js' />"></script>
</body>
</html>
