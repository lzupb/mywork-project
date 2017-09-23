package com.pengbo.myframework.repository;


import com.pengbo.myframework.entity.DefaultIdDO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.NoRepositoryBean;


@NoRepositoryBean
public interface BaseRepository<T extends DefaultIdDO> extends QueryDslPredicateExecutor<T>, JpaRepository<T, Long> {
}

