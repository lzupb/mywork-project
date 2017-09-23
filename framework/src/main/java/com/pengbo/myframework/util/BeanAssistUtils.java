package com.pengbo.myframework.util;

import static org.springframework.beans.BeanUtils.getPropertyDescriptor;
import static org.springframework.beans.BeanUtils.getPropertyDescriptors;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.lang3.ClassUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.TypeUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.BeanInstantiationException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.FatalBeanException;
import org.springframework.util.Assert;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

/**
 * created by Ryoma on 2017/3/14 in project of nengli .
 *
 * @author Ryoma
 * @date 2017/3/14
 */
public class BeanAssistUtils {

    private static final String DEFAULT_KEY = "";

    /**
     * 效果与spring 的BeanUtils类似，只是忽略属性支持级联
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyProperties(Object source, Object target, String... ignoreProperties) {
        copyProperties(source, target, true, null, ignoreProperties);
    }

    /**
     * 深度copy对象，但是会忽略数组、集合、Map三种类型的属性，
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyDiffAndIgnoreMultiProperties(Object source, Object target, String... ignoreProperties) {
        copyDiffProperties(source, target, null, true, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyDiffProperties(Object source, Object target, String... ignoreProperties) {
        copyDiffProperties(source, target, null, false, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreMultiple   忽略数组、集合、Map三种类型的属性，必须ignoreDiff=false的时候才生效
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyDiffProperties(Object source,
                                          Object target, boolean ignoreMultiple, String... ignoreProperties) {
        copyDiffProperties(source, target, null, ignoreMultiple, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param converts         遇到指定的接口，使用指定的类进行实例化。不包括Collection\Map会使用源对象的类型进行复制
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyDiffProperties(Object source,
                                          Object target, Map<Class<?>, Class<?>> converts,
                                          String... ignoreProperties) {
        copyProperties(source, target, false, false, converts, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreMultiple   忽略数组、集合、Map三种类型的属性，必须ignoreDiff=false的时候才生效
     * @param converts         遇到指定的接口，使用指定的类进行实例化。不包括Collection\Map会使用源对象的类型进行复制
     * @param ignoreProperties 忽略的属性集合，支持使用"."进行级联忽略
     */
    public static void copyDiffProperties(Object source, Object target, Map<Class<?>, Class<?>> converts,
                                          boolean ignoreMultiple, String... ignoreProperties) {
        copyProperties(source, target, false, ignoreMultiple, converts, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreDiff       是否忽略对象不同继续进行copy，true是忽略对象不同的属性，不进行copy
     * @param converts         遇到指定的接口，使用指定的类进行实例化。不包括Collection\Map会使用源对象的类型进行复制
     * @param ignoreProperties 忽略的属性集合
     */
    public static void copyProperties(Object source, Object target, boolean ignoreDiff,
                                      Map<Class<?>, Class<?>> converts, String... ignoreProperties) {
        copyProperties(source, target, ignoreDiff, false, converts, ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreDiff       是否忽略对象不同继续进行copy，true是忽略对象不同的属性，不进行copy
     * @param ignoreMultiple   忽略数组、集合、Map三种类型的属性，必须ignoreDiff=false的时候才生效
     * @param converts         遇到指定的接口，使用指定的类进行实例化。不包括Collection\Map会使用源对象的类型进行复制
     * @param ignoreProperties 忽略的属性集合
     */
    public static void copyProperties(Object source, Object target, boolean ignoreDiff, boolean ignoreMultiple,
                                      Map<Class<?>, Class<?>> converts, String... ignoreProperties) {
        copyProperties(source, target, ignoreDiff, ignoreMultiple, converts, Maps.newHashMap(), ignoreProperties);
    }

    /**
     * 深度copy对象，支持数组、集合、Map的特殊处理
     *
     * @param source           源对象
     * @param target           目标对象
     * @param ignoreDiff       忽略对象不同继续进行copy，true是忽略对象不同的属性，不进行copy
     * @param ignoreMultiple   忽略数组、集合、Map三种类型的属性，必须ignoreDiff=false的时候才生效
     * @param converts         遇到指定的接口，使用指定的类进行实例化。不包括Collection\Map会使用源对象的类型进行复制
     * @param instances        已经实例化过的对象
     * @param ignoreProperties 忽略的属性集合
     */
    private static void copyProperties(Object source, Object target, boolean ignoreDiff, boolean ignoreMultiple,
                                       Map<Class<?>, Class<?>> converts, Map<Object, Object> instances,
                                       String... ignoreProperties) {

        Assert.notNull(source, "Source must not be null");
        Assert.notNull(target, "Target must not be null");
        Class<?> actualEditable = target.getClass();
        PropertyDescriptor[] targetPds = getPropertyDescriptors(actualEditable);
        List<String> ignoreList = (ignoreProperties != null ? Arrays.asList(ignoreProperties) : null);
        Map<String, List<String>> ignoreMap = createIgnoreMap(ignoreList);
        List<String> currIgnoreList = ignoreMap.get(DEFAULT_KEY);
        for (PropertyDescriptor tpd : targetPds) {
            Method writeMethod = tpd.getWriteMethod();
            if (writeMethod != null && (currIgnoreList == null || !currIgnoreList.contains(tpd.getName()))) {
                PropertyDescriptor spd = getPropertyDescriptor(source.getClass(), tpd.getName());
                if (spd == null) {
                    continue;
                }
                Method readMethod = spd.getReadMethod();
                if (readMethod != null) {
                    try {
                        if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
                            readMethod.setAccessible(true);
                        }
                        Object tv = null;
                        Class<?> tpc = writeMethod.getParameterTypes()[0];
                        Class<?> spc = readMethod.getReturnType();
                        if (ignoreDiff) { // 操作等同于spring的BeanUtils.copyProperties
                            if (ClassUtils.isAssignable(tpc, spc)) {
                                tv = readMethod.invoke(source);
                            }
                        } else {
                            List<String> ignoreSub = ignoreMap.get(tpd.getName());
                            Object v = readMethod.invoke(source);
                            tv = ignoreDiffWrite(tpc, spc, writeMethod, readMethod, v, ignoreMultiple, converts,
                                                 instances, ignoreSub);
                        }
                        if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
                            writeMethod.setAccessible(true);
                        }
                        if (tv == null && tpc.isPrimitive()) {
                            continue;
                        }
                        writeMethod.invoke(target, tv);
                    } catch (Throwable ex) {
                        throw new FatalBeanException("Could not copy property '"
                                                             + tpd.getName() + "' from source to target", ex);
                    }
                }
            }
        }
    }

    private static Object ignoreDiffWrite(Class<?> tpc, Class<?> spc, Method writeMethod, Method readMethod, Object v,
                                          boolean ignoreMultiple, Map<Class<?>, Class<?>> converts,
                                          Map<Object, Object> instances, List<String> ignoreSub) {
        if (v == null) {
            return null;
        }
        Object mtv = instances.get(v);
        if (mtv != null) {
            return mtv;
        }
        Object tv = v;
        if (isSimpleValueType(tpc)) { // 简单类型
            return tv;
        }
        if (tpc.isArray()) { // 复合类型
            if (ignoreMultiple) { // 忽略复合类型
                return null;
            } else { // 处理复杂类型
                if (isDiffArray(tpc, spc)) {
                    tv = arrayValue(spc, tpc, v, converts, instances, ignoreSub);
                    instances.putIfAbsent(v, tv);
                }
            }
        } else if (Collection.class.isAssignableFrom(tpc)) {
            if (ignoreMultiple) { // 忽略复合类型
                return null;
            } else { // 处理复杂类型
                if (isDiffCollection(writeMethod, readMethod)) {
                    tv = collectionValue(writeMethod, readMethod, v, converts, instances,
                                         ignoreSub);
                }
            }
        } else if (Map.class.isAssignableFrom(tpc)) {
            if (ignoreMultiple) { // 忽略复合类型
                return null;
            } else { // 处理复杂类型
                if (isDiffMap(tpc, spc, writeMethod, readMethod)) {
                    tv = mapValue(writeMethod, readMethod, v, converts, instances, ignoreSub);

                }
            }
        } else { // 其他类型，例如：pojo类型
            if (!tpc.isAssignableFrom(spc)) { // 如果不是继承关系则需要进行值转换
                tv = pojoValue(spc, tpc, v, ignoreMultiple, converts, instances, ignoreSub);
            }
        }
        instances.putIfAbsent(v, tv);
        return tv;
    }

    private static boolean isDiffArray(Class<?> tpc, Class<?> spc) {
        return !tpc.equals(spc);
    }

    private static boolean isDiffMap(Class<?> tpc, Class<?> spc, Method tp, Method sp) {
        Assert.isTrue(tpc.isAssignableFrom(spc));
        Pair<Class<?>, Class<?>> tic = getMapParameterType(tp);
        Assert.isTrue(tic.getKey() != null && tic.getValue() != null);
        Pair<Class<?>, Class<?>> sic = getMapReturnParameterType(sp);
        Assert.isTrue(sic.getKey() != null && sic.getValue() != null);
        return !(tic.getKey().isAssignableFrom(sic.getKey()) && tic.getValue().isAssignableFrom(sic.getValue()));
    }

    private static boolean isDiffCollection(Method tp, Method sp) {
        boolean b = false;
        Class<?> sic = getListReturnParameterType(sp);
        Class<?> tic = getListParameterType(tp);
        Assert.notNull(sic);
        Assert.notNull(tic);
        return !tic.isAssignableFrom(sic);
    }

    private static boolean isMultipleType(Class<?> tpc) {
        return tpc.isArray() || Collection.class.isAssignableFrom(tpc) || Map.class.isAssignableFrom(tpc);
    }

    private static Map<String, List<String>> createIgnoreMap(List<String> ignoreList) {
        Map<String, List<String>> ignoreMap = Maps.newHashMap();
        if (ignoreList != null) {
            for (String property : ignoreList) {
                String prefix;
                String p;
                if (StringUtils.contains(property, ".")) {
                    prefix = StringUtils.substringBefore(property, ".");
                    p = StringUtils.substringAfter(property, ".");
                } else {
                    prefix = "";
                    p = property;
                }
                List<String> list;
                if ((list = ignoreMap.get(prefix)) == null) {
                    list = Lists.newArrayList();
                    ignoreMap.put(prefix, list);
                }
                list.add(p);
            }
        }
        return ignoreMap;
    }

    /**
     * @param spc
     * @param tpc
     * @param value
     * @param ignoreMultiple
     * @param converts
     * @param instances
     * @param ignore
     *
     * @return
     */
    private static Object pojoValue(Class<?> spc, Class<?> tpc, Object value,
                                    boolean ignoreMultiple, Map<Class<?>, Class<?>> converts,
                                    Map<Object, Object> instances, List<String> ignore) {
        return convert(value.getClass(), tpc, value, ignoreMultiple, converts, instances, ignore);
    }

    /**
     * @param tp
     * @param sp
     * @param value
     * @param converts
     * @param instances
     * @param ignore
     *
     * @return
     */
    @SuppressWarnings("unchecked")
    private static Object mapValue(Method tp, Method sp, Object value, Map<Class<?>, Class<?>> converts,
                                   Map<Object, Object> instances, List<String> ignore) {
        Map valueMap = (Map) value;
        Map targetMap = (Map) BeanUtils.instantiate(value.getClass());
        Pair<Class<?>, Class<?>> tic = getMapParameterType(tp);
        Assert.isTrue(tic.getKey() != null && tic.getValue() != null);
        Pair<Class<?>, Class<?>> sic = getMapReturnParameterType(sp);
        Assert.isTrue(sic.getKey() != null && sic.getValue() != null);
        for (Object k : valueMap.keySet()) {
            if (k == null) {
                continue;
            }
            Object tk = convert(k.getClass(), tic.getKey(), k, false, converts, instances, ignore);
            Object v = valueMap.get(k);
            Object tv = null;
            if (v != null) {
                tv = convert(v.getClass(), tic.getValue(), v, false, converts, instances, ignore);
            }
            targetMap.put(tk, tv);
        }
        return targetMap;
    }

    /**
     * @param tp        源集合中的元素的类型
     * @param sp        目标集合中的元素的类型
     * @param value
     * @param converts
     * @param instances
     * @param ignore
     *
     * @return
     */
    @SuppressWarnings("unchecked")
    private static Object collectionValue(Method tp, Method sp, Object value, Map<Class<?>, Class<?>> converts,
                                          Map<Object, Object> instances, List<String> ignore) {

        Collection valueCollection = (Collection) value;
        Collection targetValue = (Collection) BeanUtils.instantiate(value.getClass());
        Class<?> sic = getListReturnParameterType(sp);
        Class<?> tic = getListParameterType(tp);
        for (Object o : valueCollection) {
            if (o == null) {
                continue;
            }
            Object t = convert(sic, tic, o, false, converts, instances, ignore);
            targetValue.add(t);
        }
        return targetValue;
    }

    /**
     * @param spc       源属性的class类型
     * @param tpc       目标属性的class类型
     * @param value
     * @param converts
     * @param instances
     * @param ignore
     *
     * @return
     */
    private static Object arrayValue(Class<?> spc, Class<?> tpc, Object value, Map<Class<?>, Class<?>> converts,
                                     Map<Object, Object> instances, List<String> ignore) {
        Class<?> sourceItemClass = spc.getComponentType();
        Class<?> targetItemClass = tpc.getComponentType();
        int length = Array.getLength(value);
        Object targetValue = Array.newInstance(targetItemClass, length);
        for (int i = 0; i < length; i++) {
            Object sv = Array.get(value, i);
            if (sv == null) {
                continue;
            }
            Object tv = convert(sourceItemClass, targetItemClass, sv, false, converts,
                                instances, ignore);
            Array.set(targetValue, i, tv);
        }
        return targetValue;
    }

    /**
     * 根据原始类型转换到目标class
     *
     * @param sourceClass
     * @param targetClass
     * @param value
     * @param ignoreMultiple
     * @param converts
     * @param instances
     * @param ignoreProperties @return
     */
    private static Object convert(Class<?> sourceClass, Class<?> targetClass, Object value, boolean ignoreMultiple,
                                  Map<Class<?>, Class<?>> converts, Map<Object, Object> instances,
                                  List<String> ignoreProperties) {
        if (value == null) {
            return null;
        }
        Object targetValue = instances.get(value);
        if (targetValue != null) {
            return targetValue;
        }
        // 此处要解决接口不能实例化的问题
        Class<?> actualTargetClass = targetClass;
        if (targetClass.isInterface() && converts != null) {
            actualTargetClass = converts.get(targetClass);
        }
        Assert.notNull(actualTargetClass);
        targetValue = BeanUtils.instantiate(actualTargetClass);
        String[] ignorePropertiesArr = ignoreProperties != null ? ignoreProperties.toArray(new String[0]) : null;
        // 解决循环引用的问题。
        instances.put(value, targetValue);
        copyProperties(value, targetValue, false, ignoreMultiple, converts, instances, ignorePropertiesArr);
        return targetValue;
    }

    /**
     * 查询map的参数类型
     *
     * @param method
     *
     * @return
     */
    private static Pair<Class<?>, Class<?>> getMapParameterType(Method method) {
        return getMapVariableType(getTypeArguments(method));
    }

    /**
     * 查询list的参数类型
     *
     * @param method
     *
     * @return
     */
    private static Class<?> getListParameterType(Method method) {
        Map<TypeVariable<?>, Type> typeArguments = getTypeArguments(method);
        Optional<TypeVariable<?>> typeVariable = typeArguments.keySet().stream().filter(
                e -> StringUtils.equalsIgnoreCase("E", e.getName())).findFirst();
        return typeVariable.isPresent() ? (Class<?>) typeArguments.get(typeVariable.get()) : null;
    }

    private static Map<TypeVariable<?>, Type> getTypeArguments(Method method) {
        return TypeUtils.getTypeArguments((ParameterizedType) method.getGenericParameterTypes()[0]);
    }

    private static Pair<Class<?>, Class<?>> getMapReturnParameterType(Method method) {
        return getMapVariableType(getReturnParameterType(method));
    }

    private static Class<?> getListReturnParameterType(Method m) {
        Map<TypeVariable<?>, Type> typeArguments = getReturnParameterType(m);
        Optional<TypeVariable<?>> typeVariable = typeArguments.keySet().stream().filter(
                e -> StringUtils.equalsIgnoreCase("E", e.getName())).findFirst();
        return typeVariable.isPresent() ? (Class<?>) typeArguments.get(typeVariable.get()) : null;
    }

    private static Map<TypeVariable<?>, Type> getReturnParameterType(Method m) {
        return TypeUtils.getTypeArguments((ParameterizedType) m.getGenericReturnType());
    }

    /**
     * 查询参数类型
     *
     * @param method
     * @param name
     *
     * @return
     */
    private static Class<?> getTypeArguments(Method method, String name) {
        Map<TypeVariable<?>, Type> typeArguments = TypeUtils.getTypeArguments(
                (ParameterizedType) method.getGenericParameterTypes()[0]);
        Optional<TypeVariable<?>> typeVariable = typeArguments.keySet().stream().filter(
                e -> StringUtils.equalsIgnoreCase(name, e.getName())).findFirst();
        return typeVariable.isPresent() ? (Class<?>) typeArguments.get(typeVariable.get()) : null;
    }

    private static Pair<Class<?>, Class<?>> getMapVariableType(Map<TypeVariable<?>, Type> typeArguments) {
        Class<?> key = null;
        Class<?> value = null;
        for (Map.Entry<TypeVariable<?>, Type> entry : typeArguments.entrySet()) {
            if (StringUtils.equalsIgnoreCase("K", entry.getKey().getName())) {
                key = (Class<?>) entry.getValue();
            } else if (StringUtils.equalsIgnoreCase("V", entry.getKey().getName())) {
                value = (Class<?>) entry.getValue();
            }
        }
        return Pair.of(key, value);
    }

    /**
     * 判断是否是pojo类型，后续如果存在分支，修改此方法。
     *
     * @param clazz
     *
     * @return
     */
    public static boolean isPojo(Class<?> clazz) {
        Assert.notNull(clazz);
        return !(isSimpleProperty(clazz)
                         || Collection.class.isAssignableFrom(clazz)
                         || Map.class.isAssignableFrom(clazz));
    }

    /**
     * Check if the given type represents a "simple" property:
     * a primitive, a String or other CharSequence, a Number, a Date,
     * a URI, a URL, a Locale, a Class, or a corresponding array.
     * <p>Used to determine properties to check for a "simple" dependency-check.
     *
     * @param clazz the type to check
     *
     * @return whether the given type represents a "simple" property
     *
     * @see org.springframework.beans.factory.support.RootBeanDefinition#DEPENDENCY_CHECK_SIMPLE
     * @see org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#checkDependencies
     */
    public static boolean isSimpleProperty(Class<?> clazz) {
        return BeanUtils.isSimpleProperty(clazz);
    }

    /**
     * Check if the given type represents a "simple" value type:
     * a primitive, a String or other CharSequence, a Number, a Date,
     * a URI, a URL, a Locale or a Class.
     *
     * @param clazz the type to check
     *
     * @return whether the given type represents a "simple" value type
     */
    public static boolean isSimpleValueType(Class<?> clazz) {
        return BeanUtils.isSimpleValueType(clazz);
    }

    /**
     * Convenience method to instantiate a class using its no-arg constructor.
     *
     * @param clazz class to instantiate
     *
     * @return the new instance
     *
     * @throws BeanInstantiationException if the bean cannot be instantiated
     * @see Class#newInstance()
     */
    public static <T> T instantiate(Class<T> clazz) throws BeanInstantiationException {
        return BeanUtils.instantiate(clazz);
    }
}
