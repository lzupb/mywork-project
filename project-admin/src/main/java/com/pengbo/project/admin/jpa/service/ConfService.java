package com.pengbo.project.admin.jpa.service;


import com.pengbo.myframework.service.BaseService;
import com.pengbo.project.admin.jpa.entity.ConfDB;
import com.pengbo.myframework.repository.BaseRepository;
import com.pengbo.project.admin.jpa.repository.IConfDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfService extends BaseService<ConfDB, Long> {

	@Autowired
	private IConfDAO confDao;

	@Override
	protected BaseRepository<ConfDB, Long> getRepository() {
		return confDao;
	}

	public String findByKey(String key) {
		ConfDB confDB = confDao.find(key);
		if (confDB != null) {
			return confDB.getValue();
		}
		return null;
	}
	
	public List<ConfDB> findAll() {
		return confDao.findAll();
	}

}
