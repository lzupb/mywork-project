package com.pengbo.myframework.controller;

import java.util.Collection;

/**
 * ajax data
 *
 * @author Ryoma
 * @date 2016/4/27
 * @since 1.0
 */
public class AjaxData {

    Collection<?> rows;
    long total;
    int page;
    long records;

    public Collection<?> getRows() {
        return rows;
    }

    public void setRows(Collection<?> rows) {
        this.rows = rows;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public long getRecords() {
        return records;
    }

    public void setRecords(long records) {
        this.records = records;
    }
}
