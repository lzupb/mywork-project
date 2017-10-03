package com.pengbo.project.admin.jpa.entity;

import com.pengbo.myframework.entity.DefaultIdDO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by pengbo01 on 2017/10/1.
 */
@Entity
@Table(name = "tfa_alarm_act")
public class TfaAlarmAct extends DefaultIdDO {

    @Column(name = "port_num")
    private Integer portNum;

    @Column(name = "object_class")
    private String objectClass;

    @Column(name = "int_id")
    private Integer intId;

    @Column(name = "ne_label")
    private String neLabel;

    @Column(name = "probable_cause")
    private String probableCause;

    @Column(name = "alarm_title_text")
    private String alarmTitleText;

    @Column(name = "event_time")
    private Date eventTime;

    @Column(name = "cancel_time")
    private Date cancelTime;

    @Column(name = "vendor_name")
    private String vendorName;

    @Column(name = "REGION_NAME")
    private String regionName;

    public Integer getPortNum() {
        return portNum;
    }

    public void setPortNum(Integer portNum) {
        this.portNum = portNum;
    }

    public String getObjectClass() {
        return objectClass;
    }

    public void setObjectClass(String objectClass) {
        this.objectClass = objectClass;
    }

    public Integer getIntId() {
        return intId;
    }

    public void setIntId(Integer intId) {
        this.intId = intId;
    }

    public String getNeLabel() {
        return neLabel;
    }

    public void setNeLabel(String neLabel) {
        this.neLabel = neLabel;
    }

    public String getProbableCause() {
        return probableCause;
    }

    public void setProbableCause(String probableCause) {
        this.probableCause = probableCause;
    }

    public String getAlarmTitleText() {
        return alarmTitleText;
    }

    public void setAlarmTitleText(String alarmTitleText) {
        this.alarmTitleText = alarmTitleText;
    }

    public Date getEventTime() {
        return eventTime;
    }

    public void setEventTime(Date eventTime) {
        this.eventTime = eventTime;
    }

    public Date getCancelTime() {
        return cancelTime;
    }

    public void setCancelTime(Date cancelTime) {
        this.cancelTime = cancelTime;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
