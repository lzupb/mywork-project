package com.pengbo.project.admin.spring.helper;


import com.pengbo.myframework.repository.BaseRepository;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.QueryDslJpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import javax.persistence.EntityManager;
import java.io.Serializable;

@NoRepositoryBean
public class SimpleBaseRepository<T, ID extends Serializable> extends QueryDslJpaRepository<T, ID> implements
        BaseRepository<T, ID> {

    public SimpleBaseRepository(JpaEntityInformation<T, ID> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
    }
}
