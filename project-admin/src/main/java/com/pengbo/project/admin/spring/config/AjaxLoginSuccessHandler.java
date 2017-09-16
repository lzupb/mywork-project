package com.pengbo.project.admin.spring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Maps;
import com.pengbo.project.admin.util.StringFormatUtils;
import com.pengbo.project.admin.util.WebUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

/**
 * Spring security ajax方式 登录成功处理器
 * 增加对于ajax登录方式支持
 * 返回targetUrl属性
 *
 * @author Ranger
 * @date 2015/8/28
 * @since 1.0
 */

public class AjaxLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    protected final Log logger = LogFactory.getLog(this.getClass());

    private RequestCache requestCache = new HttpSessionRequestCache();

    private final ObjectMapper objectMapper;

    public AjaxLoginSuccessHandler(ObjectMapper objectMapper) {
        super();
        this.objectMapper = objectMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws ServletException, IOException {
        if (WebUtil.isAjaxRequest(request)) { // ajax请求
            String charset =
                    StringUtils.hasText(request.getCharacterEncoding()) ? request.getCharacterEncoding() : "UTF-8";
            response.setHeader("Content-Type",
                               StringFormatUtils.format("application/json;charset={}", charset));
            response.setStatus(HttpServletResponse.SC_OK);
            Map<String, Object> retMap = Maps.newHashMap();
            retMap.put("code", HttpServletResponse.SC_OK);
            retMap.put("message", "登录成功");
            // 获取跳转登陆页面前请求的地址，通过targetUrl参数返回前台
            SavedRequest savedRequest = requestCache.getRequest(request, response);
            if (savedRequest != null) {
                retMap.put("targetUrl", savedRequest.getRedirectUrl());
            }
            if (authentication != null && authentication.getPrincipal() != null) {
                if (authentication.getPrincipal() instanceof User) {
                    User user = (User) authentication.getPrincipal();
                    retMap.put("username", user.getUsername());
                }
            }

            Writer out = response.getWriter();
            try {
                out.write(objectMapper.writeValueAsString(retMap));
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else {
            SavedRequest savedRequest = requestCache.getRequest(request, response);

            if (savedRequest == null) {
                super.onAuthenticationSuccess(request, response, authentication);

                return;
            }
            String targetUrlParameter = getTargetUrlParameter();
            if (isAlwaysUseDefaultTargetUrl() || (targetUrlParameter != null && StringUtils
                                                                                        .hasText(request.getParameter(
                                                                                                targetUrlParameter)))) {
                requestCache.removeRequest(request, response);
                super.onAuthenticationSuccess(request, response, authentication);

                return;
            }

            clearAuthenticationAttributes(request);

            // Use the DefaultSavedRequest URL
            String targetUrl = savedRequest.getRedirectUrl();
            logger.debug("Redirecting to DefaultSavedRequest Url: " + targetUrl);
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }

    public void setRequestCache(RequestCache requestCache) {
        this.requestCache = requestCache;
    }

}
