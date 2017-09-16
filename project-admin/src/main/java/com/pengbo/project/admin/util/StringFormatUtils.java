package com.pengbo.project.admin.util;

import org.slf4j.helpers.MessageFormatter;

public class StringFormatUtils {

    /**
     * 格式化字符串
     *
     * @param message
     * @param args
     *
     * @return return
     */
    public static String format(String message, Object... args) {
        return MessageFormatter.format(message, args).getMessage();
    }
}
