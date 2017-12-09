package com.pengbo.myframework.util;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by sunjiangwei on 17/5/31.
 */
public final class JsonUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtils.class);

    private static final ObjectMapper OBJECT_MAPPER = JsonMapper.nonDefaultMapper().getMapper();

    private JsonUtils() {

    }

    public static <T> T readValue(String json, Class<T> clazz) throws IOException {
        return OBJECT_MAPPER.readValue(json, clazz);
    }

    public static <T> T readValue(String content, TypeReference<T> type) throws IOException {
        return OBJECT_MAPPER.readValue(content, type);
    }

    public static String object2Json(Object obj) {
        try {
            return OBJECT_MAPPER.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            LOGGER.error("Object2Json error!", e);
        }

        return null;
    }
}
