package com.pengbo.myframework.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class DefaultDateDO extends DefaultIdDO {

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(columnDefinition = "DATETIME", updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdDate;

    @LastModifiedBy
    private String lastModifiedBy;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(columnDefinition = "DATETIME")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastModifiedDate;

    public DefaultDateDO() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DefaultDateDO)) {
            return false;
        }
        DefaultDateDO that = (DefaultDateDO) o;
        return new EqualsBuilder()
                       .appendSuper(super.equals(o))
                       .append(getCreatedBy(), that.getCreatedBy())
                       .append(getCreatedDate(), that.getCreatedDate())
                       .append(getLastModifiedBy(), that.getLastModifiedBy())
                       .append(getLastModifiedDate(), that.getLastModifiedDate())
                       .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                       .appendSuper(super.hashCode())
                       .append(getCreatedBy())
                       .append(getCreatedDate())
                       .append(getLastModifiedBy())
                       .append(getLastModifiedDate())
                       .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                       .appendSuper(super.toString())
                       .append("createdDate", createdDate)
                       .append("createdBy", createdBy)
                       .append("lastModifiedDate", lastModifiedDate)
                       .append("lastModifiedBy", lastModifiedBy)
                       .toString();
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(final String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(final String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(final Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}