package config;

import com.pengbo.project.admin.spring.config.RootConfig;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * TODO h2的datasource需要支持
 * 测试配置
 *
 * @author wangsan
 * @date 2016/10/12
 */
@Configuration
@Import({RootConfig.class})
@EnableJpaAuditing
public class TestConfig {

    @Bean
    public Config config() {
        return ConfigFactory.load("app.conf");
    }

    @Bean(name = "auditorAware")
    public AuditorAware<String> auditorAware() {
        return () -> RandomStringUtils.randomAlphabetic(10);
    }

    //    @Bean(name = "dataSource", destroyMethod = "shutdown")
    //    public EmbeddedDatabase dataSource() {
    //        return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).build();
    //    }

}
