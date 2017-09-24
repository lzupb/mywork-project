package com.pengbo.project.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by pengbo01 on 2017/9/23.
 */
@Service
public class AlertBussService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Page<Map<String, Object>> findAll(String sql, Pageable pageable) {
        List<Map<String, Object>> listMap = jdbcTemplate.query(sql, new ColumnMapRowMapper());
        return new PageImpl<>(listMap, pageable, 100);
    }

}
