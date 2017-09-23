package com.pengbo.project.admin.jpa.repository;

import com.pengbo.myframework.repository.BaseRepository;
import com.pengbo.project.admin.jpa.entity.ConfDB;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface IConfDAO extends BaseRepository<ConfDB> {

    @Query("FROM ConfDB t WHERE t.key =:name")
    ConfDB find(@Param("name") String name);

}
