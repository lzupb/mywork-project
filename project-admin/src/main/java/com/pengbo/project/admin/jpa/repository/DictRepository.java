package com.pengbo.project.admin.jpa.repository;

import com.pengbo.myframework.repository.BaseRepository;
import com.pengbo.project.admin.jpa.entity.DictDB;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * collection
 * @author sunchangqing01
 *
 */
@Repository
public interface DictRepository extends BaseRepository<DictDB> {
    /**
     * 按照字典的类型查找
     *
     * @param dictType 字典类型
     *
     * @return
     */
    public List<DictDB> findByDictType(String dictType);

    public DictDB findByDictKeyAndDictType(String dictKey, String dictType);
}
