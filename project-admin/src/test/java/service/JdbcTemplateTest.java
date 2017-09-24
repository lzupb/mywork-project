package service;

import config.BaseServiceTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Date;
import java.util.List;

/**
 * Created by pengbo01 on 2017/9/24.
 */
public class JdbcTemplateTest extends BaseServiceTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testQuery() {

        String sql = "select * from my_dictdb where created_date >= ?";

        List list = jdbcTemplate.query(sql, new Object[]{new Date()}, new ColumnMapRowMapper());
        System.out.println(list.size());
    }
}
