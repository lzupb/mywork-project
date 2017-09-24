package com.pengbo.project.admin.spring.config;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigValue;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.Map;

@Configuration
@Import({JpaConfig.class})
public class DBConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(DBConfig.class);


    @Autowired
    private Config config;

    @Bean
    public DataSource dataSource() {
        Config db = config.getConfig("db");
        BasicDataSource dataSource = new BasicDataSource();
        for (Map.Entry<String, ConfigValue> entry : db.entrySet()) {
            try {
                if (StringUtils.contains(entry.getKey(), ".")) {
                    continue;
                }
                BeanUtils.setProperty(dataSource, entry.getKey(), entry.getValue().unwrapped());
                if (LOGGER.isDebugEnabled()) {
                    LOGGER.debug("set dataSource config property={}, value={}", entry.getKey(), entry.getValue());
                }
            } catch (Exception e) {
                LOGGER.warn("set property={},value={}", entry.getKey(), entry.getValue());
            }
        }
        return dataSource;

    }

    @Bean
    public JdbcTemplate getJdbcTemplate() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        if (1 == 2) {
            BasicDataSource dataSource = new BasicDataSource();
            dataSource.setDriverClassName("oracle.jdbc.driver.OracleDriver");
            dataSource.setUrl("jdbc:oracle:thin:@dm03-scan.bmcc.com.cn:8521:nmsd2");
            dataSource.setUsername("alarmrs");
            dataSource.setPassword("ZhGj#_2013");
            dataSource.setMaxTotal(100);
            jdbcTemplate.setDataSource(dataSource);
        } else {
            jdbcTemplate.setDataSource(dataSource());
        }


//        String oracleDbConfig = dictService.getValue("db.oracle.config");
//        if (Nulls.isNotEmpty(oracleDbConfig)) {
//            JsonParser jsonParser = new JsonParser();
//            JsonObject jsonObject = (JsonObject) jsonParser.parse(oracleDbConfig);
//        }
        return jdbcTemplate;

    }

}
