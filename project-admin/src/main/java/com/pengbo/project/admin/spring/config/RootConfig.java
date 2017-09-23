package com.pengbo.project.admin.spring.config;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;


@Configuration
@Import({DBConfig.class, WebSecurityConfig.class})
public class RootConfig {

    @Bean
    public Config getConfig() {
        return ConfigFactory.load("app.conf");
    }
}
