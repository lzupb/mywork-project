package com.pengbo.myframework.vo;

import org.springframework.util.Assert;

/**
 * Created by pengbo01 on 2017/9/16.
 */
public class IdVO {
    private Long id;

    public IdVO() {
        super();
    }

    public IdVO(IdVO idVO) {
        Assert.notNull(idVO);
        this.id = idVO.id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

