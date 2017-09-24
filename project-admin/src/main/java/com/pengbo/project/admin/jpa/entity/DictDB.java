package com.pengbo.project.admin.jpa.entity;


import com.pengbo.myframework.entity.DefaultDateDO;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 字典
 *
 * @author sunchangqing01
 */
@Entity
public class DictDB extends DefaultDateDO {

    private static final long serialVersionUID = -6000331600449173402L;

    /**
     * 字典值的key
     */
    @Column(nullable = false, length = 100, unique = true)
    private String dictKey;

    /**
     * 字典值
     */
    @Column(nullable = false, length = 255)
    private String dictValue;


    /**
     * 是否启用
     */
    @Column
    private Boolean enable;

    /**
     * 关于值的一些描述信息
     */
    @Column(length = 500)
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

    public DictDB() {

    }

    public DictDB(Builder builder) {
        dictKey = builder.key;
        dictValue = builder.value;
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

        public DictDB build() {
            return new DictDB(this);
        }
    }
}
