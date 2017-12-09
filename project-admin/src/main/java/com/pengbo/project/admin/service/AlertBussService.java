package com.pengbo.project.admin.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pengbo.myframework.util.BeanAssistUtils;
import com.pengbo.myframework.util.JsonUtils;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.ColumnMapRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pengbo01 on 2017/9/23.
 */
@Service
public class AlertBussService {

    private static final Logger logger = LoggerFactory.getLogger(AlertBussService.class);

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
        AlarmVO vo = convert(alarmRepository.findOne(alarmVO.getAlarmId()));
        sendMQ(vo);
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
        String myMsgserial = tfaAlarmAct.getMsgserial() + "1";
        vo.setMsgSerial(new Long(myMsgserial));
        vo.setAlarmUniqueId(tfaAlarmAct.getFp0() + "_"
                + tfaAlarmAct.getFp1() + "_"
                + tfaAlarmAct.getFp2() + "_"
                + tfaAlarmAct.getFp3());
        vo.setAlarmUniqueClearId(tfaAlarmAct.getCfp0() + "_"
                + tfaAlarmAct.getCfp1() + "_"
                + tfaAlarmAct.getCfp2() + "_"
                + tfaAlarmAct.getCfp3());
        vo.setAlarmStatus(0);
        return vo;
    }

    public void sendMQ(AlarmVO alarmVO) {
        jmsTemplate.convertAndSend(generateMQMessage(alarmVO));
    }

    private String generateMQMessage(AlarmVO alarmVO) {
        StringBuilder sb = new StringBuilder();
        sb.append("<AlarmStart>").append("/r/n");
        JsonObject jsonObject = (JsonObject) new JsonParser().parse(JsonUtils.object2Json(alarmVO));

        jsonObject.entrySet().forEach(json -> {
            sb.append(json.getKey()).append(":").append(json.getValue().getAsString());
            sb.append("/r/n");
        });
        sb.append("<AlarmEnd>");
        logger.info("mq message:{}", sb.toString());
        return sb.toString();
    }

}
