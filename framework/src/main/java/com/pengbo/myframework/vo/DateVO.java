package com.pengbo.myframework.vo;

import java.util.Date;

/**
 * Created by pengbo01 on 2017/9/24.
 */
public class DateVO extends IdVO {

    private Date createdDate;

    private Date lastModifiedDate;

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}
