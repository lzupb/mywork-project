package service;

import config.BaseServiceTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;

/**
 * Created by pengbo01 on 2017/12/9.
 */
public class JmsTemplateTest extends BaseServiceTest {

    @Autowired
    private JmsTemplate jmsTemplate;

    @Test
    public void sendMessageTest() {
        jmsTemplate.convertAndSend("my test");
    }
}
