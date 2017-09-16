package com.pengbo.project.admin.util;

import com.google.gson.JsonObject;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;

import java.io.File;

/**
 * Created by pengbo01 on 2017/1/11.
 */
public class JPEGUtil {

    public static void main(String[] args) throws Exception {
        //        String imageUrl = "http://10.65.3.194/upload/xuke09_1477533296845.jpg";
        String imageUrl = "D:\\temp\\test.jpg";
        byte[] bytes = FileUtils.readFileToByteArray(FileUtils.getFile(imageUrl));
        String image64Str = Base64.encodeBase64String(bytes);
        File destFile = new File("D:\\temp\\parameter.txt");
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("deviceId","5000000005");
        jsonObject.addProperty("image",image64Str);
        jsonObject.addProperty("requestId","aceqewqrwqpa2342565231dd");
        String encoding = "UTF-8";
        FileUtils.write(destFile, jsonObject.toString(), encoding);
    }
}
