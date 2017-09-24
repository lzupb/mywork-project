package com.pengbo.project.admin.jpa.service;


import com.google.common.base.Optional;
import com.pengbo.myframework.service.BaseService;
import com.pengbo.myframework.util.Nulls;
import com.pengbo.project.admin.jpa.entity.DictDB;
import com.pengbo.project.admin.jpa.entity.QDictDB;
import com.pengbo.project.admin.jpa.repository.DictRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;

/**
 * 字典服务
 *
 * @author sunchangqing01
 */
@Service
public class DictService extends BaseService<DictDB> {

    @PersistenceContext
    EntityManager entityManager;

    private QDictDB d = QDictDB.dictDB;

    private DictRepository dictRepository;

    protected DictService(DictRepository dictRepository) {
        super(dictRepository);
        this.dictRepository = dictRepository;
    }

    public Predicate buildCriteria(DictDB vo) {
        BooleanBuilder builder = new BooleanBuilder();
        QDictDB qObj = QDictDB.dictDB;
        if (StringUtils.isNotBlank(vo.getDictKey())) {
            builder.and(qObj.dictKey.contains(vo.getDictKey()));
        }
        if (StringUtils.isNotBlank(vo.getDictValue())) {
            builder.and(qObj.dictValue.contains(vo.getDictValue()));
        }

        return builder;
    }


    public String getValue(String key) {
        DictDB dictDB = get(key);
        if (Nulls.isNotNull(dictDB)) {
            return dictDB.getDictValue();
        }
        return null;
    }


    @Cacheable("getDictValueFromCache")
    public String getDictValueFromCache(String key) {
        DictDB dictDB = get(key);
        if (dictDB != null) {
            return dictDB.getDictValue();
        }
        return null;
    }

    /**
     * 获得字典值
     *
     * @param key 字典值的key
     * @return 字典值，无对应值返回null
     */
    public DictDB get(String key) {
        return dictRepository.findOne(d.dictKey.eq(key));
    }

    public boolean updateValue(String key, String newValue, Optional<String> oldValueOpt) {
        final QDictDB dict = QDictDB.dictDB;
        final BooleanExpression eq = dict.dictKey.eq(key);
        if (oldValueOpt.isPresent()) {
            eq.and(dict.dictValue.eq(oldValueOpt.get()));
        }

        long updated = new JPAUpdateClause(entityManager, dict).where(eq).set(dict.dictValue, newValue)
                .set(dict.lastModifiedDate, new Date()).execute();
        return updated > 0;
    }

    /**
     * 创建一个新的，如果key已经存在会抛出异常
     */
    public DictDB create(String key, String value, String type) {

        final DictDB dict = new DictDB();
        dict.setDictKey(key);
        dict.setCreatedDate(new Date());
        dict.setDictValue(value);
        dict.setLastModifiedDate(new Date());

        return dictRepository.save(dict);
    }

    public long remove(String key) {
        return new JPADeleteClause(entityManager, QDictDB.dictDB).where(QDictDB.dictDB.dictKey.eq(key)).execute();

    }

}
