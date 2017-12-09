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

    @Column(name = "FP0")
    private Long fp0;

    @Column(name = "FP1")
    private Long fp1;

    @Column(name = "FP2")
    private Long fp2;

    @Column(name = "FP3")
    private Long fp3;

    @Column(name = "C_FP0")
    private Long cfp0;

    @Column(name = "C_FP1")
    private Long cfp1;

    @Column(name = "C_FP2")
    private Long cfp2;

    @Column(name = "C_FP3")
    private Long cfp3;

    @Column(name = "MSGSERIAL")
    private Long msgserial;

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

    public Long getFp0() {
        return fp0;
    }

    public void setFp0(Long fp0) {
        this.fp0 = fp0;
    }

    public Long getFp1() {
        return fp1;
    }

    public void setFp1(Long fp1) {
        this.fp1 = fp1;
    }

    public Long getFp2() {
        return fp2;
    }

    public void setFp2(Long fp2) {
        this.fp2 = fp2;
    }

    public Long getFp3() {
        return fp3;
    }

    public void setFp3(Long fp3) {
        this.fp3 = fp3;
    }

    public Long getCfp0() {
        return cfp0;
    }

    public void setCfp0(Long cfp0) {
        this.cfp0 = cfp0;
    }

    public Long getCfp1() {
        return cfp1;
    }

    public void setCfp1(Long cfp1) {
        this.cfp1 = cfp1;
    }

    public Long getCfp2() {
        return cfp2;
    }

    public void setCfp2(Long cfp2) {
        this.cfp2 = cfp2;
    }

    public Long getCfp3() {
        return cfp3;
    }

    public void setCfp3(Long cfp3) {
        this.cfp3 = cfp3;
    }

    public Long getMsgserial() {
        return msgserial;
    }

    public void setMsgserial(Long msgserial) {
        this.msgserial = msgserial;
    }
}
