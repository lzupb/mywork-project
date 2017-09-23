package com.pengbo.project.admin.service;

import com.pengbo.myframework.service.BaseBussService;
import com.pengbo.project.admin.jpa.entity.DictDB;
import com.pengbo.project.admin.jpa.service.DictService;
import com.pengbo.project.admin.vo.dict.DictVO;
import org.springframework.stereotype.Service;

/**
 * Created by zhaoxiaoguang on 17/6/10.
 */
@Service
public class DictBussService extends BaseBussService<DictVO, DictDB> {
    private DictService dictService;

    protected DictBussService(DictService dictService) {
        super(dictService);
        this.dictService = dictService;
    }

    public boolean updateDict(DictVO dictVO) {
        DictDB dictDO = dictService.findOne(dictVO.getId());
        if (dictDO == null) {
            return false;
        }
        dictDO.setDictKey(dictVO.getDictKey());
        dictDO.setDictValue(dictVO.getDictValue());
        dictDO.setDescription(dictVO.getDescription());
        dictDO.setEnable(dictVO.getEnable());
        dictService.save(dictDO);
        return true;
    }

    public String getValue(String key) {
        return dictService.getValue(key);
    }
}
