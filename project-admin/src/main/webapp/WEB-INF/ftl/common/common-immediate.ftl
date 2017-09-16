<#import "/spring.ftl" as spring/>
<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='<@spring.url '/static/assets/js/jquery.min.js' />'>" + "<" + "/script>");
</script>
<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
    window.jQuery || document.write("<script src='<@spring.url '/static/assets/js/jquery1x.min.js' />'>" + "<" + "/script>");
</script>
<![endif]-->
<script src="<@spring.url '/static/assets/js/bootstrap.min.js' />"></script>


<script>
    // 菜单状态调整
    (function resetMenu() {

        var curUrl = window.location.href;//当前浏览器
        $(".directable").each(function () {
            var localUrl = $(this).attr("href");
            var showHref = $(this).attr("showHref");
            if (localUrl == "#" && localUrl == "#") {
                return;
            }

            var urlArray = [localUrl];
            if (showHref) {
                showHref.split(',').forEach(function (item) {
                    urlArray.push(item);
                });
            }

            var flag = false;
            urlArray.every(function (url) {
                if (curUrl.indexOf(url) >= 0) {
                    flag = true;
                    return false;
                }
                return true;
            });

            if (flag) {
                var obj_li = $(this).closest("li");
                $(obj_li).addClass("active");
                $(obj_li).parents("li").each(function () {
                    $(this).addClass("active open");
                });
                return;
            }
        });
    })();
</script>

