package service;

import com.pengbo.project.admin.service.AlertBussService;
import com.pengbo.project.admin.vo.alert.AlarmVO;
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

    @Autowired
    private AlertBussService alertBussService;

    @Test
    public void sendMessageTest() {
        AlarmVO alarmVO = alertBussService.findOne(1L);
        alertBussService.sendMQ(alarmVO);
//        jmsTemplate.convertAndSend("my test");
    }
}
