package com.pengbo.project.admin.vo.dict;


import com.pengbo.myframework.vo.IdVO;

/**
 * Created by pengbo01 on 2017/9/16.
 */
public class DictVO extends IdVO {
    /**
     * 字典值的key
     */
    private String dictKey;

    /**
     * 字典值
     */
    private String dictValue;

    /**
     * 字典值的类型
     */
    private String dictType;

    /**
     * 是否启用
     */
    private Boolean enable;

    /**
     * 关于值的一些描述信息
     */
    private String description;

    public String getDictKey() {
        return dictKey;
    }

    public void setDictKey(String dictKey) {
        this.dictKey = dictKey;
    }

    public String getDictValue() {
        return dictValue;
    }

    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
    }

    public String getDictType() {
        return dictType;
    }

    public void setDictType(String dictType) {
        this.dictType = dictType;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DictVO() {

    }

    public DictVO(Builder builder) {
        dictKey = builder.key;
        dictValue = builder.value;
        dictType = builder.type;
        enable = builder.enable;
        description = builder.desc;
    }

    public static class Builder {
        private final String key;
        private final String value;

        private String type = "";
        private String desc = "";
        private boolean enable = true;

        public Builder(String key, String value) {
            this.key = key;
            this.value = value;
        }

        public Builder type(String type) {
            this.type = type;
            return this;
        }

        public Builder desc(String desc) {
            this.desc = desc;
            return this;
        }

        public Builder enable(boolean enable) {
            this.enable = enable;
            return this;
        }

        public DictVO build() {
            return new DictVO(this);
        }
    }
}
