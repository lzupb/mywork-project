package com.pengbo.project.admin.jpa.entity;

import com.pengbo.myframework.entity.DefaultDateDO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by pengbo01 on 2017/10/2.
 */
@Entity
@Table(name = "tfa_alarm_local")
public class TfaAlertLocal extends DefaultDateDO {

    @Column(name = "tfa_alarm_id", nullable = false)
    private Long tfaAlarmId;

    @Column(name = "cancel_time", nullable = false)
    private Date cancelTime;

    public Long getTfaAlarmId() {
        return tfaAlarmId;
    }

    public void setTfaAlarmId(Long tfaAlarmId) {
        this.tfaAlarmId = tfaAlarmId;
    }

    public Date getCancelTime() {
        return cancelTime;
    }

    public void setCancelTime(Date cancelTime) {
        this.cancelTime = cancelTime;
    }
}
