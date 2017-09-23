package com.pengbo.myframework.service;

import java.util.List;

import com.pengbo.myframework.entity.DefaultIdDO;
import com.pengbo.myframework.repository.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Lists;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;

/**
 * 默认的service实现
 */
public abstract class BaseService<T extends DefaultIdDO> {

    /**
     * 约定字段名称为：repository
     */
    private BaseRepository<T> repository;

    @SuppressWarnings("unchecked")
    protected BaseService(BaseRepository repository) {
        this.repository = repository;
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public List<T> findAll(Sort sort) {
        return repository.findAll(sort);
    }

    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<T> findAll(Predicate predicate) {
        return Lists.newArrayList(repository.findAll(predicate));
    }

    public List<T> findAll(Iterable<Long> ids) {
        return repository.findAll(ids);
    }

    public List<T> findAll(Predicate predicate, OrderSpecifier<?>... orders) {
        return Lists.newArrayList(repository.findAll(predicate, orders));
    }

    public Page<T> findAll(Predicate predicate, Pageable pageable) {
        return repository.findAll(predicate, pageable);
    }

    @Transactional
    public <S extends T> S save(S entity) {
        return repository.save(entity);
    }

    @Transactional
    public <S extends T> List<S> save(Iterable<S> entities) {
        return repository.save(entities);
    }

    @Transactional
    public T saveAndFlush(T entity) {
        return repository.saveAndFlush(entity);
    }

    public void flush() {
        repository.flush();
    }

    public T findOne(Long id) {
        return repository.findOne(id);
    }

    public T findOne(Predicate predicate) {
        return repository.findOne(predicate);
    }

    public boolean exists(Long id) {
        return repository.exists(id);
    }

    public long count() {
        return repository.count();
    }

    public long count(Predicate predicate) {
        return repository.count(predicate);
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(id);
    }

    @Transactional
    public void delete(T entity) {
        repository.delete(entity);
    }

    @Transactional
    public void delete(Iterable<? extends T> entities) {
        repository.delete(entities);
    }

    @Transactional
    public void deleteInBatch(Iterable<T> entities) {
        repository.deleteInBatch(entities);
    }

    @Transactional
    public void deleteAllInBatch() {
        repository.deleteAllInBatch();
    }

    @Transactional
    public void deleteAll() {
        repository.deleteAll();
    }

    public BaseRepository<T> getRepository() {
        return repository;
    }

    public void setRepository(BaseRepository<T> repository) {
        this.repository = repository;
    }
}

