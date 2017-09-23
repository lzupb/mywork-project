<!-- #section:basics/sidebar -->
<div id="sidebar" class="sidebar responsive">
    <script type="text/javascript">
        try {
            ace.settings.check('sidebar', 'fixed')
        } catch (e) {
        }
    </script>

    <div class="sidebar-shortcuts" id="sidebar-shortcuts">
        <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            <button class="btn btn-success">
                <i class="ace-icon fa fa-signal"></i>
            </button>
            <button class="btn btn-info">
                <i class="ace-icon fa fa-pencil"></i>
            </button>
            <!-- #section:basics/sidebar.layout.shortcuts -->
            <button class="btn btn-warning">
                <i class="ace-icon fa fa-users"></i>
            </button>
            <button class="btn btn-danger">
                <i class="ace-icon fa fa-cogs"></i>
            </button>
            <!-- /section:basics/sidebar.layout.shortcuts -->
        </div>

        <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
            <span class="btn btn-success"></span>
            <span class="btn btn-info"></span>
            <span class="btn btn-warning"></span>
            <span class="btn btn-danger"></span>
        </div>
    </div>
    <!-- /.sidebar-shortcuts -->

    <ul class="nav nav-list">
        <li class="">
            <a href="##">
            <#--<i class="menu-icon fa fa-tachometer"></i>-->
                <span style="font-weight: bold; font-size: 18px;cursor: default;" class="menu-text"> 功能菜单 </span>
            </a>
            <b class="arrow"></b>
        </li>

        <!-- 组织管理 -->
        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-desktop"></i>
                <span class="menu-text"> 告警管理 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu">

                <li class="">
                    <a href="<@spring.url '/alert/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 告警查询 </a>
                    <b class="arrow"></b>
                </li>

                <li class="">
                    <a href="<@spring.url '/unitGrant/list' />"
                       showHref="<@spring.url '/unitGrant/update'/>,<@spring.url '/unitGrant/add'/>/>"
                       class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 组织授权 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/idlAccount/list' />"
                       showHref="<@spring.url '/idlAccount/update'/>,<@spring.url '/idlAccount/add'/>,<@spring.url '/idlAccount/view'/>"
                       class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> idl账号管理 </a>
                    <b class="arrow"></b>
                </li>

            </ul>
        </li>

        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-rocket"></i>
                <span class="menu-text"> 权限管理 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu">
                <li class="">
                    <a href="<@spring.url '/role/list' />"
                       showHref="<@spring.url '/role/addUser'/>,<@spring.url '/role/update'/>,<@spring.url '/role/add'/>,<@spring.url '/role/updateAuthApproval'/>,<@spring.url '/role/updateAuthTicket'/>"
                       class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 角色管理 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/resource/list' />"
                       showHref="<@spring.url '/resource/update'/>,<@spring.url '/resource/add'/>,<@spring.url '/resource/view'/>"
                       class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 资源管理 </a>
                    <b class="arrow"></b>
                </li>
            </ul>
        </li>

        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-reorder"></i>
                <span class="menu-text"> 日志管理 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu">
            <@security.authorize access="hasAnyRole('ADMIN')">
                <li class="">
                    <a href="<@spring.url '/verifyLog/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 操作日志 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/requestLog/listRequestIn' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> APP请求日志 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/requestLog/listRequestOut' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 调用外部接口日志 </a>
                    <b class="arrow"></b>
                </li>
            </@security.authorize>
            </ul>
        </li>
        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-reorder"></i>
                <span class="menu-text"> 统计报表 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu">
            <@security.authorize access="hasAnyRole('ADMIN')">
                <li class="">
                    <a href="<@spring.url '/statistics/identifyList' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 识别分段统计 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/verifyLogStatistics/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> 识别率统计 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/statistics/requestOut/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> IDL调用统计 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/statistics/deviceLogStat/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> APP用时统计 </a>
                    <b class="arrow"></b>
                </li>
                <li class="">
                    <a href="<@spring.url '/requestInLogStatistic/list' />" class="directable"> <i
                            class="menu-icon fa fa-caret-right"></i> App请求日志统计 </a>
                    <b class="arrow"></b>
                </li>
            </@security.authorize>
            </ul>
        </li>
    <#--</@security.authorize>-->

    <@security.authorize access="hasAnyRole('ADMIN')">
        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-magic"></i>
                <span class="menu-text"> 系统管理 </span>
                <b class="arrow fa fa-angle-down"></b>
            </a>
            <b class="arrow"></b>
            <ul class="submenu">
                <li class="">
                    <a href="#" class="dropdown-toggle">
                        <i class="menu-icon fa fa-caret-right"></i>
                        字典信息管理
                        <b class="arrow fa fa-angle-down"></b>
                    </a>
                    <ul class="submenu">
                        <li class="">
                            <a href="<@spring.url '/dict/update' />" class="directable">
                                <i class="menu-icon fa fa-caret-right"></i>
                                添加字典
                            </a>

                            <b class="arrow"></b>
                        </li>
                        <li class="">
                            <a href="<@spring.url '/dict/list' />" class="directable">
                                <i class="menu-icon fa fa-caret-right"></i>
                                字典列表
                            </a>
                            <b class="arrow"></b>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </@security.authorize>

    </ul>
    <!-- /.nav-list -->

    <!-- #section:basics/sidebar.layout.minimize -->
    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left"
           data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>

    <script type="text/javascript">
        try {
            ace.settings.check('sidebar', 'collapsed')
        } catch (e) {
        }
    </script>
</div>
