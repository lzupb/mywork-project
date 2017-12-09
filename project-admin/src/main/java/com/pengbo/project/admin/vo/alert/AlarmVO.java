package com.pengbo.project.admin.vo.alert;

import java.util.Date;

/**
 * Created by pengbo01 on 2017/10/3.
 */
public class AlarmVO {

    private Long id;

    private Long alarmId;

    private Integer portNum;

    private String objectClass;

    private Integer intId;

    private String neLabel;

    private String probableCause;

    private String alarmTitleText;

    private Date eventTime;

    private Date cancelTime;

    private String vendorName;

    private String regionName;

    private Long localAlarmId;

    private Date localCancelTime;

    public Long getAlarmId() {
        return alarmId;
    }

    public void setAlarmId(Long alarmId) {
        this.alarmId = alarmId;
    }

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

    public Long getLocalAlarmId() {
        return localAlarmId;
    }

    public void setLocalAlarmId(Long localAlarmId) {
        this.localAlarmId = localAlarmId;
    }

    public Date getLocalCancelTime() {
        return localCancelTime;
    }

    public void setLocalCancelTime(Date localCancelTime) {
        this.localCancelTime = localCancelTime;
    }

    public Long getId() {
        return alarmId;
    }

    public void setId(Long id) {
        this.id = id;
        this.alarmId = id;
    }
}
