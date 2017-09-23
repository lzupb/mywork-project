package com.pengbo.myframework.controller;

import java.util.List;

import com.pengbo.myframework.util.Nulls;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.util.Assert;


/**
 * created by Ryoma on 2016/11/24 in project of nengli .
 *
 * @author Ryoma
 * @date 2016/11/24
 */
public class RestPageResponse extends RestResponse<AjaxData> {

    public RestPageResponse(Page page) {
        AjaxData data = new AjaxData();
        data.setRecords(0);
        data.setPage(1);
        data.setTotal(1);
        data.setRows(null);
        if (Nulls.isNotNull(page) && Nulls.isNotEmpty(page.getContent())) {
            data.setRecords(page.getTotalElements());
            data.setPage(page.getNumber() + 1);
            data.setTotal(page.getTotalPages());
            data.setRows(page.getContent());
        }
        setData(data);
    }

    public RestPageResponse(List list) {
        AjaxData data = new AjaxData();
        data.setRecords(0);
        data.setPage(1);
        data.setTotal(1);
        data.setRows(null);
        if (Nulls.isNotEmpty(list)) {
            data.setRecords(list.size());
            data.setRows(list);
        }
        setData(data);
    }
}
