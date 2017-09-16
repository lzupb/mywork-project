package com.pengbo.project.admin.spring;

import org.springframework.core.annotation.Order;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * Created by pengbo01 on 2017/6/29.
 */
@Order(5)
public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {

}
