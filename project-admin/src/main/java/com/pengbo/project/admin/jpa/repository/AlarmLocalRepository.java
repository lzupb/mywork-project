package com.pengbo.project.admin.jpa.repository;

import com.pengbo.myframework.repository.BaseRepository;
import com.pengbo.project.admin.jpa.entity.TfaAlarmAct;
import com.pengbo.project.admin.jpa.entity.TfaAlertLocal;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pengbo
 */
@Repository
public interface AlarmLocalRepository extends BaseRepository<TfaAlertLocal> {

}
