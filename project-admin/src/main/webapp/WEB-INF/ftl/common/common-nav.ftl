<div id="navbar" class="navbar navbar-default navbar-fixed-top">
    <div class="navbar-container" id="navbar-container">
        <button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
            <span class="sr-only">展开</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>

        <div class="navbar-header pull-left .btn-group" style="min-width: 150px;">
            <a href="<@spring.url '/'/>" class="navbar-brand">
                <small>
                    <i class="fa fa-leaf"></i>
                ${title}
                </small>
            </a>
        </div>
        <input type="hidden" id="accountId" name="accountId"
               value="<@security.authentication property='principal.username'/>"/>

        <div class="navbar-buttons navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav">
                <li class="light-blue">
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        <img class="nav-user-photo" src="<@spring.url '/static/assets/avatars/user.png'/>"/>
								<span class="user-info">
									<small>您好：</small>
                            <@security.authentication property="principal.username"/>
								</span>
                        <i class="ace-icon fa fa-caret-down"></i>
                    </a>
                    <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <li>
                            <a id="logout-btn" href="/logoutProcess">
                                <i class="ace-icon fa fa-power-off"></i>
                                退出
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<div style="clear:both;"></div>