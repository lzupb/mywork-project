package com.pengbo.project.admin.spring.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Maps;
import com.pengbo.project.admin.util.StringFormatUtils;
import com.pengbo.project.admin.util.WebUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.Map;

/**
 * Spring security 登录失败处理器
 * 增加对于ajax方式登录失败的支持
 *
 * @author Ranger
 * @date 2014/8/15
 * @since 1.0
 */
public class AjaxLoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    public static final Logger logger = LoggerFactory.getLogger(AjaxLoginFailureHandler.class);

    private final ObjectMapper objectMapper;

    public AjaxLoginFailureHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * 如果是ajax请求，登录失败则返回状态信息
     *
     * @param request
     * @param response
     * @param exception
     *
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        if (WebUtil.isAjaxRequest(request)) { // ajax请求
            if (logger.isDebugEnabled()) {
                logger.debug("ajax login failure", exception);
            }
            String characterEncoding = request.getCharacterEncoding();
            if (StringUtils.isBlank(characterEncoding)) {
                characterEncoding = Charset.defaultCharset().toString();
            }
            response.setHeader("Content-Type",
                               StringFormatUtils.format("application/json;charset={}", characterEncoding));
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            Map<String, Object> retMap = Maps.newHashMap();
            retMap.put("code", HttpServletResponse.SC_UNAUTHORIZED);
            retMap.put("message", "登录失败");
            retMap.put("cause", exception.getMessage());
            Writer out = null;
            try {
                out = response.getWriter();
                out.write(objectMapper.writeValueAsString(retMap));
            } catch (Exception e) {
                logger.debug("get response writer or map to json error:", exception);
            } finally {
                if (out != null) {
                    out.close();
                }
            }
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}
