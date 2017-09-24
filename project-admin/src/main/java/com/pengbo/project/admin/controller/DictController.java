package com.pengbo.project.admin.controller;

import com.pengbo.myframework.controller.AbstractRestController;
import com.pengbo.myframework.controller.RestPageResponse;
import com.pengbo.myframework.controller.RestResponse;
import com.pengbo.myframework.util.Nulls;
import com.pengbo.project.admin.jpa.entity.QDictDB;
import com.pengbo.project.admin.service.DictBussService;
import com.pengbo.project.admin.vo.dict.DictVO;
import com.querydsl.core.BooleanBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;


/**
 * 字典管理
 * <p>
 */
@RequestMapping(value = "/dict")
@Controller
public class DictController extends AbstractRestController {

    @Autowired
    private DictBussService dictBussService;

    private QDictDB entity = QDictDB.dictDB;

    @RequestMapping(value = "list", produces = {MediaType.TEXT_HTML_VALUE})
    public String list(Model model) {
        model.addAttribute("title", "SBJK-ADMIN");
        return "dict/list";
    }

    @RequestMapping(value = "getData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestPageResponse getData(Pageable pageable, DictVO dictVO) {
        BooleanBuilder builder = new BooleanBuilder();
        if (Nulls.isNotEmpty(dictVO.getDictKey())) {
            builder.and(entity.dictKey.contains(dictVO.getDictKey()));
        }
        if (Nulls.isNotEmpty(dictVO.getDictValue())) {
            builder.and(entity.dictValue.contains(dictVO.getDictValue()));
        }

        Page<DictVO> page = dictBussService.findAll(builder, pageable);
        return successPageResponse(page);
    }

    /**
     * 更新字典信息
     *
     * @param dictVO
     * @return
     */
    @RequestMapping(value = "updateData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestResponse updateDict(DictVO dictVO) {
        if (!dictBussService.updateDict(dictVO)) {
            return errorResponse("更新失败");
        }
        return successResponse();
    }

    @RequestMapping(value = "update", produces = {MediaType.TEXT_HTML_VALUE})
    public String userUpdate(Long id, Model model) {
        model.addAttribute("title", "SBJK-ADMIN");
        if (id == null) {
            model.addAttribute("bean", new DictVO());
        } else {
            DictVO dict = dictBussService.findOne(id);
            if (StringUtils.isNotBlank(dict.getDictValue())) {
                dict.setDictValue(HtmlUtils.htmlEscape(dict.getDictValue()));
            }
            model.addAttribute("title", "SBJK-ADMIN");
            model.addAttribute("bean", dict);
        }
        return "dict/update";

    }

    /**
     * 删除
     *
     * @param dictVO
     * @return
     */
    @PostMapping(value = "delete")
    @ResponseBody
    public RestResponse deleteDict(DictVO dictVO) {
        dictBussService.delete(dictVO.getId());
        return successResponse();
    }
}
