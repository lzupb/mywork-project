package com.pengbo.project.admin.controller;

import com.pengbo.myframework.controller.AbstractRestController;
import com.pengbo.myframework.controller.RestPageResponse;
import com.pengbo.myframework.controller.RestResponse;
import com.pengbo.myframework.util.Nulls;
import com.pengbo.project.admin.jpa.entity.QTfaAlarmAct;
import com.pengbo.project.admin.jpa.entity.TfaAlarmAct;
import com.pengbo.project.admin.service.AlertBussService;
import com.pengbo.project.admin.vo.BatchUpdateAlarmVO;
import com.pengbo.project.admin.vo.alert.AlarmVO;
import com.pengbo.project.admin.vo.alert.AlertQueryVO;
import com.querydsl.core.BooleanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * 字典管理
 * <p>
 */
@RequestMapping(value = "/alert")
@Controller
public class AlertController extends AbstractRestController {

    @Autowired
    private AlertBussService alertBussService;

    private QTfaAlarmAct qTfaAlarmAct = QTfaAlarmAct.tfaAlarmAct;

    @InitBinder
    public void initBinder(WebDataBinder binder) throws Exception {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        CustomDateEditor editor = new CustomDateEditor(df, true);
        binder.registerCustomEditor(Date.class, editor);
    }

    @RequestMapping(value = "update", produces = {MediaType.TEXT_HTML_VALUE})
    public String update(Long id, Model model) {
        model.addAttribute("title", "SBJK-ADMIN");
        AlarmVO vo = alertBussService.findOne(id);
        model.addAttribute("bean", vo);
        return "alert/update";
    }

    @RequestMapping(value = "updateData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestResponse updateAlart(AlarmVO alarmVO) {
        alertBussService.uploadAlarm(alarmVO);
        return successResponse();
    }

    @RequestMapping(value = "delete", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestResponse deleteAlart(Long id) {
        alertBussService.deleteLocalAlarm(id);
        return successResponse();
    }

    @RequestMapping(value = "batchUpdateData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestResponse batchUpdate(@RequestBody BatchUpdateAlarmVO batchUpdateAlarmVO, Model model) {
        alertBussService.batchUploadAlarm(batchUpdateAlarmVO);
        return successResponse();
    }


    @RequestMapping(value = "list", produces = {MediaType.TEXT_HTML_VALUE})
    public String list(Model model) {
        model.addAttribute("title", "SBJK-ADMIN");
        return "alert/list";
    }

    @RequestMapping(value = "getData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestPageResponse getData(Pageable pageable, AlertQueryVO alertQueryVO) {

        BooleanBuilder builder = new BooleanBuilder();
        if (null != alertQueryVO) {
            if (Nulls.isNotEmpty(alertQueryVO.getNe_label())) {
                builder.and(qTfaAlarmAct.neLabel.contains(alertQueryVO.getNe_label()));
            }
            if (Nulls.isNotEmpty(alertQueryVO.getObject_class())) {
                builder.and(qTfaAlarmAct.objectClass.eq(alertQueryVO.getObject_class()));
            }
            if (alertQueryVO.isCancel_time_is_null()) {
                builder.and(qTfaAlarmAct.cancelTime.isNull());
            }
            if (Nulls.isNotNull(alertQueryVO.getStart_cancel_time())) {
                builder.and(qTfaAlarmAct.cancelTime.goe(alertQueryVO.getStart_cancel_time()));
            }
            if (Nulls.isNotNull(alertQueryVO.getEnd_cancel_time())) {
                builder.and(qTfaAlarmAct.cancelTime.loe(alertQueryVO.getEnd_cancel_time()));
            }

            if (Nulls.isNotNull(alertQueryVO.getStart_event_time())) {
                builder.and(qTfaAlarmAct.eventTime.goe(alertQueryVO.getStart_event_time()));
            }
            if (Nulls.isNotNull(alertQueryVO.getEnd_event_time())) {
                builder.and(qTfaAlarmAct.eventTime.loe(alertQueryVO.getEnd_event_time()));
            }
        }

        Page<TfaAlarmAct> page = alertBussService.searchByCondition(builder, pageable);
//        Page<AlarmVO> page = alertBussService.searchAlarmVO(builder, pageable);
        return successPageResponse(page);
    }

    private String buildWhere(AlertQueryVO alertQueryVO) {
        String sql = "select port_num,object_class,int_id,ne_label,probable_cause,alarm_title_text," +
                "event_time,cancel_time,vendor_name,REGION_NAME from tfa_alarm_act "
                + buildWhere(alertQueryVO);
        StringBuilder sb = new StringBuilder(" where 1=1 ");
        if (null != alertQueryVO) {
            if (Nulls.isNotEmpty(alertQueryVO.getNe_label())) {
                sb.append(" and ").append("ne_label like %").append(alertQueryVO.getNe_label()).append("%");
            }
            if (Nulls.isNotEmpty(alertQueryVO.getObject_class())) {
                sb.append(" and ").append("object_class = ").append(alertQueryVO.getObject_class());
            }
            if (alertQueryVO.isCancel_time_is_null()) {
                sb.append(" and ").append("cancel_time is null");
            }

        }
        return sb.toString();
    }


}
