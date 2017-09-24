package com.pengbo.myframework.controller;

/**
 * @author pengbo
 */
public class RestResponse<T> {

    /**
     * 结果的code,使用string类型，便于扩展非数字的code码
     */
    private String code;

    private String msg;
    /**
     * 请求ID
     */
    private String requestId;
    /**
     * 结果数据
     */
    private T data;

    /**
     * 有自定义数据时使用
     */
    private Object custom;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Object getCustom() {
        return custom;
    }

    public void setCustom(Object custom) {
        this.custom = custom;
    }

    /**
     * 添加requestId
     *
     * @param requestId
     *
     * @return
     */
    public RestResponse<T> requestId(String requestId) {
        this.setRequestId(requestId);
        return this;
    }

    /**
     * 添加requestId
     *
     * @param custom
     *
     * @return
     */
    public RestResponse<T> custom(Object custom) {
        this.setCustom(custom);
        return this;
    }

    public RestResponse<T> data(T data) {
        this.setData(data);
        return this;
    }

    public RestResponse<T> msg(String msg) {
        this.setMsg(msg);
        return this;
    }

    public RestResponse<T> code(String code) {
        this.setCode(code);
        return this;
    }


}
