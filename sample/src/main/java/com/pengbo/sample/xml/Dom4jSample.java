package com.pengbo.sample.xml;

import java.io.IOException;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.VisitorSupport;
import org.dom4j.io.SAXReader;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class Dom4jSample {

	public static void main(String[] args) {

		try {
			// String text =
			// "<members> <member>sitinspring</member> </members>";
			// Document simpledocument = DocumentHelper.parseText(text);

			Resource resource = new ClassPathResource("/sample/galicaster.xml");
			SAXReader reader = new SAXReader();
			Document doc = reader.read(resource.getFile());
			// Element rootElm = doc.getRootElement();
			// QName rootQname = rootElm.getQName();
			// List<Element> trackElements = rootElm.elements("media");

			doc.accept(new VisitorSupport() {

				@Override
				public void visit(Element node) {
					if (node.getName().equals("track")) {
						String trackType = node.attributeValue("type");
						System.out.println(trackType);
						String mimeType = node.element("mimetype")
								.getTextTrim();
						System.out.println(mimeType);
						String fileName = node.element("url").getTextTrim();
						System.out.println(fileName);
						return;

					}

					if (node.getName().equals("property")) {
						String videoProperty = node.attributeValue("name");
						if (videoProperty != null
								&& videoProperty.equals("som")) {
							String som = node.getTextTrim();
							System.out.println("som:" + som);
							return;
						}

						if (videoProperty != null
								&& videoProperty.equals("eom")) {
							String eom = node.getTextTrim();
							System.out.println("eom:" + eom);
							return;
						}

					}
				}
			});
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
