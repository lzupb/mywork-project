package com.pengbo.project.admin.service;

import com.pengbo.myframework.util.BeanAssistUtils;
import com.pengbo.myframework.util.Nulls;
import com.pengbo.project.admin.jpa.entity.QTfaAlarmAct;
import com.pengbo.project.admin.jpa.entity.QTfaAlertLocal;
import com.pengbo.project.admin.jpa.entity.TfaAlarmAct;
import com.pengbo.project.admin.jpa.entity.TfaAlertLocal;
import com.pengbo.project.admin.jpa.repository.AlarmLocalRepository;
import com.pengbo.project.admin.jpa.repository.AlarmRepository;
import com.pengbo.project.admin.vo.BatchUpdateAlarmVO;
import com.pengbo.project.admin.vo.alert.AlarmVO;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by pengbo01 on 2017/9/23.
 */
@Service
public class AlertBussService {

    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private AlarmLocalRepository alarmLocalRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QTfaAlarmAct tfaAlarmAct = QTfaAlarmAct.tfaAlarmAct;

    private QTfaAlertLocal tfaAlertLocal = QTfaAlertLocal.tfaAlertLocal;

    public Page<Map<String, Object>> findAll(String sql, Pageable pageable) {
        List<Map<String, Object>> listMap = jdbcTemplate.query(sql, new ColumnMapRowMapper());
        return new PageImpl<>(listMap, pageable, 100);
    }

    public Page<TfaAlarmAct> searchByCondition(Predicate condition, Pageable pageable) {
        return alarmRepository.findAll(condition, pageable);
    }

    public AlarmVO findOne(Long id) {
        TfaAlarmAct tfaAlarmAct = alarmRepository.findOne(id);
        if (null != tfaAlarmAct) {
            return convert(tfaAlarmAct);
        }
        return null;
    }

    public void deleteLocalAlarm(Long alarmId) {
        TfaAlertLocal local = alarmLocalRepository.findOne(tfaAlertLocal.tfaAlarmId.eq(alarmId));
        if (null != local) {
            alarmLocalRepository.delete(local);
        }
    }

    public void batchUploadAlarm(BatchUpdateAlarmVO batchUpdateAlarmVO) {
        if (null != batchUpdateAlarmVO) {
            for (Long alarmId : batchUpdateAlarmVO.getAlarmIds()) {
                TfaAlertLocal local = alarmLocalRepository.findOne(tfaAlertLocal.tfaAlarmId.eq(alarmId));
                if (null == local) {
                    local = new TfaAlertLocal();
                    local.setTfaAlarmId(alarmId);
                }
                local.setCancelTime(batchUpdateAlarmVO.getCancelTime());
                alarmLocalRepository.save(local);
            }

        }

    }

    public void uploadAlarm(AlarmVO alarmVO) {
        TfaAlertLocal local = alarmLocalRepository.findOne(tfaAlertLocal.tfaAlarmId.eq(alarmVO.getAlarmId()));
        if (null == local) {
            local = new TfaAlertLocal();
            local.setTfaAlarmId(alarmVO.getAlarmId());
        }
        local.setCancelTime(alarmVO.getCancelTime());
        alarmLocalRepository.save(local);
    }

    public Page<AlarmVO> searchAlarmVO(Predicate condition, Pageable pageable) {
        List<Tuple> list = jpaQueryFactory.select(
                tfaAlarmAct, tfaAlertLocal)
                .from(tfaAlarmAct, tfaAlertLocal)
                .rightJoin(tfaAlertLocal).on(tfaAlarmAct.id.eq(tfaAlertLocal.tfaAlarmId))
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        if (Nulls.isNotEmpty(list)) {
            List<AlarmVO> alarmVOList = new ArrayList<>();
            list.forEach(tuple -> {
                AlarmVO vo = convert(tuple.get(tfaAlarmAct));
                TfaAlertLocal local = tuple.get(tfaAlertLocal);
                if (null != local) {
                    vo.setCancelTime(local.getCancelTime());
                    vo.setLocalCancelTime(local.getCancelTime());
                    vo.setLocalAlarmId(local.getId());
                }
                alarmVOList.add(vo);
            });

        }
        return null;
    }

    private AlarmVO convert(TfaAlarmAct tfaAlarmAct) {
        AlarmVO vo = new AlarmVO();
        BeanAssistUtils.copyProperties(tfaAlarmAct, vo);
        vo.setAlarmId(tfaAlarmAct.getId());
        return vo;
    }

}
