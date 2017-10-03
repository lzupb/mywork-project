package com.pengbo.project.admin.vo;

import java.util.Date;
import java.util.List;

/**
 * Created by pengbo01 on 2017/10/3.
 */
public class BatchUpdateAlarmVO {

    private List<Long> alarmIds;

    private Date cancelTime;

    public List<Long> getAlarmIds() {
        return alarmIds;
    }

    public void setAlarmIds(List<Long> alarmIds) {
        this.alarmIds = alarmIds;
    }

    public Date getCancelTime() {
        return cancelTime;
    }

    public void setCancelTime(Date cancelTime) {
        this.cancelTime = cancelTime;
    }
}
