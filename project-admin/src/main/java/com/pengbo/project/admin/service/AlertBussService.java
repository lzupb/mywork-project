package com.pengbo.project.admin.service;

import com.ibm.mq.jms.MQQueue;
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
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.jms.Destination;
import javax.jms.JMSException;
import java.util.ArrayList;
import java.util.HashMap;
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

    @Autowired
    private JmsTemplate jmsTemplate;

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
        Destination destination = null;
        try {
            destination = new MQQueue("test.q");
            jmsTemplate.convertAndSend(destination, "");
        } catch (JMSException e) {
            e.printStackTrace();
        }

    }

    public Page<AlarmVO> searchAlarmVO(Predicate condition, Pageable pageable) {
        List<TfaAlarmAct> list = jpaQueryFactory.select(
                tfaAlarmAct)
                .from(tfaAlarmAct)
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long totalCount = jpaQueryFactory.select(
                tfaAlarmAct)
                .from(tfaAlarmAct)
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchCount();
        if (Nulls.isNotEmpty(list)) {
            List<Long> alarmIdList = new ArrayList<>();
            list.forEach(tfaAlarmAct1 -> {
                alarmIdList.add(tfaAlarmAct1.getId());
            });
            List<TfaAlertLocal> localList = jpaQueryFactory
                    .select(tfaAlertLocal)
                    .from(tfaAlertLocal)
                    .where(tfaAlertLocal.tfaAlarmId.in(alarmIdList)).fetch();
            Map<Long, TfaAlertLocal> localMap = new HashMap<>();
            if (Nulls.isNotEmpty(localList)) {
                localList.forEach(local -> {
                    localMap.put(local.getTfaAlarmId(), local);
                });

            }
            List<AlarmVO> alarmVOList = new ArrayList<>();
            list.forEach(tfaAlarmAct -> {
                AlarmVO vo = convert(tfaAlarmAct);
                TfaAlertLocal local = localMap.get(tfaAlarmAct.getId());
                if (null != local) {
                    vo.setCancelTime(tfaAlarmAct.getCancelTime());
                    vo.setLocalCancelTime(local.getCancelTime());
                    vo.setLocalAlarmId(local.getId());
                }
                alarmVOList.add(vo);
            });
            Page<AlarmVO> page = new PageImpl<AlarmVO>(alarmVOList, pageable, totalCount);
            return page;

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
