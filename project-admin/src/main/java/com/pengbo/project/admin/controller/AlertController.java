package com.pengbo.project.admin.controller;

import com.pengbo.myframework.controller.AbstractRestController;
import com.pengbo.myframework.controller.RestPageResponse;
import com.pengbo.project.admin.service.AlertBussService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;


/**
 * 字典管理
 * <p>
 */
@RequestMapping(value = "/alert")
@Controller
public class AlertController extends AbstractRestController {

    @Autowired
    private AlertBussService alertBussService;


    @RequestMapping(value = "list", produces = {MediaType.TEXT_HTML_VALUE})
    public String list(Model model) {
        model.addAttribute("title", "SBJK-ADMIN");
        return "alert/list";
    }

    @RequestMapping(value = "getData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestPageResponse getData(Pageable pageable, Map<String, Object> model) {
        String sql = "select port_num,object_class,int_id,ne_label,probable_cause,alarm_title_text," +
                "event_time,cancel_time,vendor_name,REGION_NAME from tfa_alarm_act where rownum<=10";
        Page<Map<String, Object>> page = alertBussService.findAll(sql, pageable);
        return successPageResponse(page);
    }


}
