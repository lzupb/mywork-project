<!-- 基本js -->
<#import "/spring.ftl" as spring/>
<!-- 引用portal的js文件 -->
<#--<script src="${helperJsUrl?string}"></script>-->
<script src="<@spring.url '/static/assets/js/bootbox.min.js' />"></script>
<script src="<@spring.url '/static/assets/js/jqGrid/jquery.jqGrid.min.js' />"></script>
<script src="<@spring.url '/static/assets/js/jqGrid/i18n/grid.locale-cn.js' />"></script>

<!-- ace -->
<script src="<@spring.url '/static/assets/js/bootbox.js' />"></script>
<script src="<@spring.url '/static/assets/js/chosen.jquery.min.js' />"></script>
<script src="<@spring.url '/static/assets/js/ace-elements.min.js' />"></script>
<script src="<@spring.url '/static/assets/js/ace.min.js' />"></script>
