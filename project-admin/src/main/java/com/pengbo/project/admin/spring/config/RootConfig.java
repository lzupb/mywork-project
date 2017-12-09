package com.pengbo.project.admin.spring.config;

import com.ibm.mq.jms.MQQueue;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.Destination;


@Configuration
@Import({DBConfig.class, WebSecurityConfig.class})
public class RootConfig {

    @Bean
    public Config getConfig() {
        return ConfigFactory.load("app.conf");
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        try {
            MQQueueConnectionFactory ibmMQFactory = new MQQueueConnectionFactory();
            ibmMQFactory.setHostName(getConfig().getString("ibm.mq.host_name"));
            ibmMQFactory.setPort(getConfig().getInt("ibm.mq.port"));
            ibmMQFactory.setCCSID(getConfig().getInt("ibm.mq.CCSID"));
            ibmMQFactory.setQueueManager(getConfig().getString("ibm.mq.queue_manager"));
            ibmMQFactory.setChannel(getConfig().getString("ibm.mq.channel"));
            ibmMQFactory.setTransportType(getConfig().getInt("ibm.mq.transport_type"));
            CachingConnectionFactory factory = new CachingConnectionFactory();
            factory.setTargetConnectionFactory(ibmMQFactory);
            JmsTemplate template = new JmsTemplate(factory);
            Destination destination = new MQQueue(getConfig().getString("ibm.mq.destination"));
            template.setDefaultDestination(destination);
            return template;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }
}
