package com.pengbo.project.admin.vo.alert;

/**
 * Created by pengbo01 on 2017/9/23.
 */
public class AlertQueryVO {

    private Integer port_num;

    private String object_class;

    private Integer int_id;

    private String ne_label;

    private String probable_cause;

    private String alarm_title_text;

    private String start_event_time;

    private String end_event_time;

    private String start_cancel_time;

    private String end_cancel_time;

    private String vendor_name;

    private String REGION_NAME;

    private boolean cancel_time_is_null;

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

    public boolean isCancel_time_is_null() {
        return cancel_time_is_null;
    }

    public void setCancel_time_is_null(boolean cancel_time_is_null) {
        this.cancel_time_is_null = cancel_time_is_null;
    }

    public String getStart_event_time() {
        return start_event_time;
    }

    public void setStart_event_time(String start_event_time) {
        this.start_event_time = start_event_time;
    }

    public String getEnd_event_time() {
        return end_event_time;
    }

    public void setEnd_event_time(String end_event_time) {
        this.end_event_time = end_event_time;
    }

    public String getStart_cancel_time() {
        return start_cancel_time;
    }

    public void setStart_cancel_time(String start_cancel_time) {
        this.start_cancel_time = start_cancel_time;
    }

    public String getEnd_cancel_time() {
        return end_cancel_time;
    }

    public void setEnd_cancel_time(String end_cancel_time) {
        this.end_cancel_time = end_cancel_time;
    }
}
