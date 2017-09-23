package com.pengbo.myframework.util;

import java.util.Collection;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Nulls
 *
 * @author Ranger
 * @date 2015/9/6
 * @since 1.0
 */

public class Nulls {
    public static boolean isNull(Object obj) {
        return obj == null;
    }

    public static boolean isNotNull(Object obj) {
        return obj != null;
    }

    public static boolean isNotEmpty(CharSequence cs) {
        return StringUtils.isNotEmpty(cs);
    }

    public static boolean isNotEmpty(Collection coll) {
        return CollectionUtils.isNotEmpty(coll);
    }

    public static boolean isNotEmpty(Map map) {
        return map != null && !map.isEmpty();
    }

    public static <T> boolean isNotEmpty(T[] arr) {
        return arr != null && arr.length > 0;
    }

    public static boolean isEmpty(Collection coll) {
        return CollectionUtils.isEmpty(coll);
    }

    public static boolean isEmpty(Map map) {
        return map == null || map.isEmpty();
    }

    public static boolean isEmpty(CharSequence cs) {
        return StringUtils.isEmpty(cs);
    }

    public static <T> boolean isEmpty(T[] arr) {
        return arr == null || arr.length <= 0;
    }

}
