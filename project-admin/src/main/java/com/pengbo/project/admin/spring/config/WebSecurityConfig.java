package com.pengbo.project.admin.spring.config;

import com.google.common.collect.Sets;
import com.pengbo.project.admin.spring.helper.CustomObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.util.Set;

/**
 * Created by pengbo01 on 2017/6/27.
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, proxyTargetClass = true)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //配置user-detail服务
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("USER");
        auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN");
        auth.inMemoryAuthentication().withUser("dba").password("root123").roles("ADMIN", "DBA");
    }

    //对每个请求进行细粒度安全性控制的关键在于重载一下方法
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().disable();
        http.csrf().disable();
        // 设置所有的请求都需要权限，但是不包含上面配置的忽略的url
        http.authorizeRequests().anyRequest().authenticated();

        http.formLogin()
                .loginPage("/login")//登录页面的访问路径
                .loginProcessingUrl("/loginProcess")//登录页面下表单提交的路径
                .passwordParameter("password")
                .usernameParameter("username")
                .failureHandler(authenticationFailureHandler())
                .successHandler(authenticationSuccessHandler())
                .permitAll();

        // 自定义注销
        http.logout()
                .invalidateHttpSession(true).logoutUrl("/logoutProcess")
                .logoutSuccessUrl("/login").clearAuthentication(true);

        // session管理
        http.sessionManagement()
                .sessionFixation().newSession().maximumSessions(1).expiredUrl("/login");
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
        Set<String> urls = Sets.newHashSet("/error/**", "/static/**", "/favicon.ico", "/api/**");
        web.ignoring().antMatchers(urls.toArray(new String[urls.size()]));
    }

    /**
     * 验证成功handler
     *
     * @return
     */
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        AjaxLoginSuccessHandler successHandler = new AjaxLoginSuccessHandler(new CustomObjectMapper());
        successHandler.setDefaultTargetUrl("/");
        return successHandler;
    }

    /**
     * 验证失败handler
     *
     * @return
     */
    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        AjaxLoginFailureHandler failureHandler = new AjaxLoginFailureHandler(new CustomObjectMapper());
        failureHandler.setDefaultFailureUrl("/error/403");
        return failureHandler;
    }


}
