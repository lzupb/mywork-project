package com.pengbo.project.admin.vo.alert;

import java.util.Date;

/**
 * Created by pengbo01 on 2017/9/23.
 */
public class AlertInfoVO {

    private Integer port_num;

    private String object_class;

    private Integer int_id;

    private String ne_label;

    private String probable_cause;

    private String alarm_title_text;

    private Date event_time;

    private Date cancel_time;

    private String vendor_name;

    private String REGION_NAME;

    public Integer getPort_num() {
        return port_num;
    }

    public void setPort_num(Integer port_num) {
        this.port_num = port_num;
    }

    public String getObject_class() {
        return object_class;
    }

    public void setObject_class(String object_class) {
        this.object_class = object_class;
    }

    public Integer getInt_id() {
        return int_id;
    }

    public void setInt_id(Integer int_id) {
        this.int_id = int_id;
    }

    public String getNe_label() {
        return ne_label;
    }

    public void setNe_label(String ne_label) {
        this.ne_label = ne_label;
    }

    public String getProbable_cause() {
        return probable_cause;
    }

    public void setProbable_cause(String probable_cause) {
        this.probable_cause = probable_cause;
    }

    public String getAlarm_title_text() {
        return alarm_title_text;
    }

    public void setAlarm_title_text(String alarm_title_text) {
        this.alarm_title_text = alarm_title_text;
    }

    public Date getEvent_time() {
        return event_time;
    }

    public void setEvent_time(Date event_time) {
        this.event_time = event_time;
    }

    public Date getCancel_time() {
        return cancel_time;
    }

    public void setCancel_time(Date cancel_time) {
        this.cancel_time = cancel_time;
    }

    public String getVendor_name() {
        return vendor_name;
    }

    public void setVendor_name(String vendor_name) {
        this.vendor_name = vendor_name;
    }

    public String getREGION_NAME() {
        return REGION_NAME;
    }

    public void setREGION_NAME(String REGION_NAME) {
        this.REGION_NAME = REGION_NAME;
    }

    @Override
    public String toString() {
        return "AlertInfoVO{" +
                "port_num=" + port_num +
                ", object_class='" + object_class + '\'' +
                ", int_id=" + int_id +
                ", ne_label='" + ne_label + '\'' +
                ", probable_cause='" + probable_cause + '\'' +
                ", alarm_title_text='" + alarm_title_text + '\'' +
                ", event_time=" + event_time +
                ", cancel_time=" + cancel_time +
                ", vendor_name='" + vendor_name + '\'' +
                ", REGION_NAME='" + REGION_NAME + '\'' +
                '}';
    }
}
