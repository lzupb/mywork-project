package com.pengbo.myframework.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * 提供默认的实现
 */
@MappedSuperclass
public abstract class DefaultIdDO implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DefaultIdDO)) {
            return false;
        }
        DefaultIdDO that = (DefaultIdDO) o;
        return new EqualsBuilder().append(getId(), that.getId()).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                       .append(getId())
                       .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("id", id).toString();
    }
}
