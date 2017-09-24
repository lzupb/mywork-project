package com.pengbo.myframework.controller;

import com.google.common.collect.Maps;
import org.springframework.data.domain.Page;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public abstract class AbstractRestController extends AbstractController {

    protected static final String CHARSET = ";charset=UTF-8";

    protected static final String SUCCESS_CODE = "200";

    protected static final String SUCCESS_Message = "操作成功";

    protected static final String ERROR_CODE = "500";

    protected static final String ERROR_Message = "系统内部错误";

    /**
     * 空数据的成功结果
     *
     * @return
     */
    protected RestResponse successResponse() {
        return restResponse(SUCCESS_CODE, SUCCESS_Message, null);
    }

    /**
     * 空数据的成功结果
     *
     * @param message
     * @return
     */
    protected RestResponse successResponse(String message) {
        return restResponse(SUCCESS_CODE, message, null);
    }

    /**
     * 返回单个对象的成功结果
     *
     * @param data
     * @param <T>
     * @return
     */
    protected <T> RestResponse<T> successResponse(T data) {
        return restResponse(SUCCESS_CODE, SUCCESS_Message, data);
    }


    /**
     * 返回分页数据的成功结果
     *
     * @param data
     * @param <E>
     * @return
     */
    protected <E> RestPageResponse successPageResponse(Page<E> data) {
        return restPageResponse(SUCCESS_CODE, SUCCESS_Message, data);
    }



    /**
     * 返回无错误信息的错误对象
     *
     * @return
     */
    protected RestResponse<Map<String, String>> errorResponse() {
        return restResponse(ERROR_CODE, ERROR_Message, Maps.newHashMap());
    }

    /**
     * 返回带错误描述的错误对象
     *
     * @param message
     * @return
     */
    protected RestResponse<Map<String, String>> errorResponse(String message) {
        return restResponse(ERROR_CODE, message, Maps.newHashMap());
    }

    /**
     * 返回带错误描述的错误对象
     *
     * @param code
     * @param message
     * @return
     */
    protected RestResponse<Map<String, String>> errorResponse(String code, String message) {
        return restResponse(code, message, Maps.newHashMap());
    }

    /**
     * 参数类型为list的错误响应
     *
     * @param errors
     * @return
     */
    protected RestResponse<Map<String, String>> errorResponse(List<ObjectError> errors) {
        Map<String, String> errorMap = null;
        if (errors != null) {
            errorMap = errors.stream()
                    .collect(Collectors.toMap(ObjectError::getObjectName, ObjectError::getDefaultMessage));
        }
        return errorResponse(errorMap);
    }

    /**
     * 返回带有map类型的错误信息
     *
     * @param errors
     * @return
     */
    protected RestResponse<Map<String, String>> errorResponse(Map<String, String> errors) {
        return restResponse(ERROR_CODE, ERROR_Message, errors);
    }

    /**
     * 返回响应对象
     *
     * @param code
     * @param message
     * @param data
     * @param <E>
     * @return
     */
    protected <E> RestResponse restResponse(String code, String message, List<E> data) {
        RestResponse restResponse = new RestResponse();
        restResponse.setData(data);
        restResponse.setCode(code);
        restResponse.setMsg(message);
        return restResponse;
    }

    /**
     * 返回响应对象
     *
     * @param code
     * @param message
     * @param data
     * @param <E>
     * @return
     */
    protected <E> RestPageResponse restPageResponse(String code, String message, Page<E> data) {
        RestPageResponse restPageResponse = new RestPageResponse(data);
        restPageResponse.setCode(code);
        restPageResponse.setMsg(message);
        return restPageResponse;
    }

    /**
     * 返回响应对象
     *
     * @param code
     * @param message
     * @param data
     * @param <T>
     * @return
     */
    protected <T> RestResponse<T> restResponse(String code, String message, T data) {
        return new RestResponse<T>().code(code).msg(message).data(data);
    }
}
