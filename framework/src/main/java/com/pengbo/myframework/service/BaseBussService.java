package com.pengbo.myframework.service;

import com.google.common.collect.Lists;
import com.pengbo.myframework.entity.DefaultIdDO;
import com.pengbo.myframework.util.BeanAssistUtils;
import com.pengbo.myframework.vo.IdVO;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

/**
 * created by Ryoma on 2017/5/25 in project of sfg-parent .
 *
 * @author Ryoma
 * @date 2017/5/25
 */
public abstract class BaseBussService<T extends IdVO, E extends DefaultIdDO> {

    private BaseService<E> service;

    @SuppressWarnings("unchecked")
    public BaseBussService(BaseService service) {
        this.service = service;
    }

    public List<T> findAll() {
        return listDoTransform(service.findAll());
    }

    public List<T> findAll(Sort sort) {
        return listDoTransform(service.findAll(sort));
    }

    public Page<T> findAll(Pageable pageable) {
        Page<E> pageInfo = service.findAll(pageable);
        if (pageInfo != null && pageInfo.getTotalPages() < (pageable.getPageNumber() + 1)) {
            int redirectPage = pageInfo.getTotalPages() - 1;
            if (redirectPage < 0) {
                redirectPage = 0;
            }
            pageable = new PageRequest(redirectPage, pageable.getPageSize());
            pageInfo = service.findAll(pageable);

        }
        List<T> list = listDoTransform(pageInfo.getContent());
        return new PageImpl<>(list, pageable, pageInfo.getTotalElements());
    }

    public List<T> findAll(Predicate predicate) {
        Iterable<E> all = service.findAll(predicate);
        return listDoTransform(Lists.newArrayList(all));
    }

    public List<T> findAll(Iterable<Long> ids) {
        return listDoTransform(Lists.newArrayList(service.findAll(ids)));
    }

    public List<T> findAll(Predicate predicate, OrderSpecifier<?>... orders) {
        Iterable<E> all = service.findAll(predicate, orders);
        return listDoTransform(Lists.newArrayList(all));
    }

    public Page<T> findAll(Predicate predicate, Pageable pageable) {
        Page<E> pageInfo = service.findAll(predicate, pageable);
        if (pageInfo != null && pageInfo.getTotalPages() < (pageable.getPageNumber() + 1)) {
            int redirectPage = pageInfo.getTotalPages() - 1;
            if (redirectPage < 0) {
                redirectPage = 0;
            }
            pageable = new PageRequest(redirectPage, pageable.getPageSize());
            pageInfo = service.findAll(predicate, pageable);

        }
        List<T> list = listDoTransform(pageInfo.getContent());
        return new PageImpl<>(list, pageable, pageInfo.getTotalElements());
    }

    @Transactional
    public T save(T dto) {
        E e = transform(dto);
        service.save(e);
        transform(e, dto);
        return dto;
    }

    /**
     * 增加一个更新方法用来防止替换掉CreatedBy和CreatedDate
     *
     * @param dto
     *
     * @return
     */
    @Transactional
    public T update(T dto) {
        return save(dto);
    }

    @SuppressWarnings("unchecked")
    public List<T> save(List<T> dtoList) {
        List<E> es = listDtoTransform(dtoList);
        service.save(es);
        listDoTransform(es, dtoList);
        return dtoList;
    }

    @Transactional
    public T saveAndFlush(T dto) {
        E e = transform(dto);
        service.saveAndFlush(e);
        transform(e, dto);
        return dto;
    }

    public void flush() {
        service.flush();
    }

    public T findOne(Long id) {
        return transform(service.findOne(id));
    }

    public T findOne(Predicate predicate) {
        return transform(service.findOne(predicate));
    }

    public boolean exists(Long id) {
        return service.exists(id);
    }

    public long count() {
        return service.count();
    }

    public long count(Predicate predicate) {
        return service.count(predicate);
    }

    @Transactional
    public void delete(Long id) {
        service.delete(id);
    }

    @Transactional
    public void delete(T dto) {
        if (dto == null) {
            return;
        }
        E e = service.findOne(dto.getId());
        service.delete(e);
    }

    @Transactional
    public void delete(Iterable<? extends T> dtoList) {
        if (dtoList == null) {
            return;
        }
        Iterable<E> all = service.findAll(Lists.newArrayList(dtoList).stream().map(IdVO::getId)
                .collect(Collectors.toList()));
        service.delete(all);
    }

    @Transactional
    public void deleteInBatch(Iterable<T> dtoList) {
        if (dtoList == null) {
            return;
        }
        Iterable<E> all = service.findAll(Lists.newArrayList(dtoList).stream().map(IdVO::getId)
                .collect(Collectors.toList()));
        service.deleteInBatch(all);
    }

    @Transactional
    public void deleteAllInBatch() {
        service.deleteAllInBatch();
    }

    @Transactional
    public void deleteAll() {
        service.deleteAll();
    }

    public List<T> listDoTransform(List<E> es) {
        if (es == null) {
            return Lists.newArrayList();
        }
        return es.stream().map(this::transform).collect(Collectors.toList());
    }

    public List<E> listDtoTransform(List<T> ts) {
        if (ts == null) {
            return Lists.newArrayList();
        }
        return ts.stream().map(this::transform).collect(Collectors.toList());
    }

    public void listDoTransform(List<E> es, List<T> ts) {
        if (es == null) {
            return;
        }
        for (int i = 0; i < es.size(); i++) {
            transform(es.get(i), ts.get(i));
        }
    }

    public void listDtoTransform(List<T> ts, List<E> es) {
        if (ts == null) {
            return;
        }
        for (int i = 0; i < ts.size(); i++) {
            transform(ts.get(i), es.get(i));
        }
    }

    public T transform(E e) {
        if (e == null) {
            return null;
        }
        T t = getT();
        transform(e, t);
        return t;
    }

    public E transform(T t) {
        if (t == null) {
            return null;
        }
        E e = getE();
        transform(t, e);
        return e;
    }

    /**
     * 子类可以覆盖来重新自定义转换逻辑
     *
     * @param e
     *
     * @return
     */
    protected void transform(E e, T t) {
        BeanAssistUtils.copyDiffAndIgnoreMultiProperties(e, t);
    }

    /**
     * 子类可以覆盖来重新自定义转换逻辑,默认会copy各个层级的Bean属性，但是会忽略集合、数组和Map三种类型
     *
     * @param t
     */
    protected void transform(T t, E e) {
        BeanAssistUtils.copyDiffAndIgnoreMultiProperties(t, e);
    }

    @SuppressWarnings("unchecked")
    private T getT() {
        return (T) getGenericSuperclass(0);
    }

    @SuppressWarnings("unchecked")
    private E getE() {
        return (E) getGenericSuperclass(1);
    }

    @SuppressWarnings("unchecked")
    private Object getGenericSuperclass(int i) {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType p = (ParameterizedType) t;
        Type[] arguments = p.getActualTypeArguments();
        Assert.isTrue(i < arguments.length);
        Class c = (Class) arguments[i];
        try {
            return c.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new IllegalArgumentException(e);
        }
    }
}
