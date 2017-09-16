package com.pengbo.project.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 */
@Controller
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping(value = {"/index", "/"},
            produces = {MediaType.TEXT_HTML_VALUE})
    public String index(Model model) {
        logger.info("enter IndexController index");
        model.addAttribute("title", "SBJK-ADMIN");
        return "index";
    }

    @RequestMapping(value = {"/rest/test"}, method = RequestMethod.GET,
            produces = {MediaType.TEXT_HTML_VALUE})
    public String test() {
        return "/gate";
    }

    /**
     * 登入
     **/
    @RequestMapping(value = "/login")
    public void login() {

    }

    /**
     * 登出
     **/
    @RequestMapping(value = "/logout")
    public void logout() {
    }
}
