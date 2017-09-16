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
												<i class="ace-icon fa fa-sitemap"></i>
												404
											</span>
                    您要访问的页面不存在
                </h1>

                <hr/>
                <div>
                    <div class="space"></div>
                    <h4 class="smaller">你可以尝试以下其它操作:</h4>

                    <ul class="list-unstyled spaced inline bigger-110 margin-15">
                        <li>
                            <i class="ace-icon fa fa-hand-o-right blue"></i>
                            查看页面路径是否正确
                        </li>

                        <li>
                            <i class="ace-icon fa fa-hand-o-right blue"></i>
                            联系我们: admin
                        </li>
                    </ul>
                </div>

                <hr/>
                <div class="space"></div>
            </div>
        </div>
    </div>
</div>
<script src="<@spring.url '/static/js/common/require-config.js'/> "></script>
<script src="<@spring.url '/static/js/lib/require-2.1.20-min.js' />"></script>
</body>
</html>
