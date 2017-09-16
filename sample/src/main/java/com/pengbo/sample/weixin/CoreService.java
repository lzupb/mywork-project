package com.pengbo.sample.weixin;

/**
 * 处理微信发来的信息
 * 
 * @author Sunlight
 * 
 */
public class CoreService {

	public static String processRequest(String xmlMsg) {
		// 默认返回的文本消息内容
		String result = "";
		try {
			ReceiveXmlEntity xmlEntity = new ReceiveXmlProcess()
					.getMsgEntity(xmlMsg);
			String content = "test string";
			result = new FormatXmlProcess().formatXmlAnswer(
					xmlEntity.getFromUserName(), xmlEntity.getToUserName(),
					content);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			result = "有异常了。。。";
		}
		return result;
	}

}
