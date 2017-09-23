package com.pengbo.project.admin.controller;

import com.pengbo.myframework.controller.AbstractRestController;
import com.pengbo.myframework.controller.RestPageResponse;
import com.pengbo.myframework.controller.RestResponse;
import com.pengbo.myframework.util.Nulls;
import com.pengbo.myframework.vo.IdVO;
import com.pengbo.project.admin.service.DictBussService;
import com.pengbo.project.admin.vo.dict.DictVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.Map;


/**
 * 字典管理
 * <p>
 */
@RequestMapping(value = "/dict")
@Controller
public class DictController extends AbstractRestController {

    @Autowired
    private DictBussService dictBussService;

    /**
     * 添加一个字典
     *
     * @param dictVO
     * @return RestResponse
     */
    @PostMapping(value = "save")
    public RestResponse addDict(@Valid @RequestBody DictVO dictVO) {
        if (dictVO == null) {
            return errorResponse("dictVO 信息为空！");
        }
        return successResponse(dictBussService.save(dictVO));
    }

    /**
     * 获取字典信息
     *
     * @param idVO
     * @return RestResponse
     */
    @PostMapping(value = "view")
    public RestResponse<DictVO> view(@RequestBody IdVO idVO) {
        if (idVO == null || idVO.getId() == null) {
            return new RestResponse<DictVO>().code(ERROR_CODE).msg("参数为null！");
        }
        if (!dictBussService.exists(idVO.getId())) {
            return new RestResponse<DictVO>().code(ERROR_CODE).msg("dict id is not exist!");
        }
        return successResponse(dictBussService.findOne(idVO.getId()));
    }

    @RequestMapping(value = "list", produces = {MediaType.TEXT_HTML_VALUE})
    public String list(Model model) {
        model.addAttribute("dictTypes", "");
        model.addAttribute("dictTypesJsonString", "{}");
        model.addAttribute("title", "SBJK-ADMIN");
        return "dict/list";
    }

    @RequestMapping(value = "getData", produces = {MediaType.APPLICATION_JSON_VALUE + CHARSET})
    @ResponseBody
    public RestPageResponse getData(Pageable pageable, Map<String, Object> model) {
        Page<DictVO> page = dictBussService.findAll(pageable);
        return successPageResponse(page);
    }

    /**
     * 更新字典信息
     *
     * @param dictVO
     * @return
     */
    @PostMapping(value = "update")
    public RestResponse updateCamera(@RequestBody DictVO dictVO) {
        if (dictVO == null || dictVO.getId() == null) {
            return errorResponse("参数错误!");
        }
        if (dictVO.getId() == null || !dictBussService.exists(dictVO.getId())) {
            return errorResponse("字典 id is not exist!");
        }
        if (!dictBussService.updateDict(dictVO)) {
            return errorResponse("更新失败");
        }
        return successResponse();
    }

    /**
     * 删除
     *
     * @param dictVO
     * @return
     */
    @PostMapping(value = "delete")
    public RestResponse deleteDict(@RequestBody DictVO dictVO) {
        dictBussService.delete(dictVO.getId());
        return successResponse();
    }
}
