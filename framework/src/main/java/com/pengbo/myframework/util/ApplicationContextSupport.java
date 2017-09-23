package com.pengbo.myframework.util;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.context.ApplicationContext;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * created by Ryoma on 16/10/26 in project of nengli-cluster .
 *
 * @author Ryoma
 * @date 16/10/26
 */
public abstract class ApplicationContextSupport {

    /**
     * 查询所有context里指定type的beanNames
     *
     * @param context
     * @param type
     *
     * @return
     */
    public static String[] getBeanNamesFromAllContextByType(ApplicationContext context, Class<?> type) {
        ApplicationContext curr = context;
        List<String> list = Lists.newArrayList();
        while (curr != null) {
            CollectionUtils.addAll(list, curr.getBeanNamesForType(type));
            curr = curr.getParent();
        }
        return list.toArray(new String[0]);
    }

    /**
     * 从所有的context中获取bean
     *
     * @param context
     * @param type
     * @param <T>
     *
     * @return
     */
    public static <T> Map<String, T> getBeanFromAllContextByType(ApplicationContext context, Class<T> type) {
        ApplicationContext curr = context;
        Map<String, T> map = Maps.newLinkedHashMap();
        while (curr != null) {
            map.putAll(curr.getBeansOfType(type));
            curr = curr.getParent();
        }
        return map;
    }
}
