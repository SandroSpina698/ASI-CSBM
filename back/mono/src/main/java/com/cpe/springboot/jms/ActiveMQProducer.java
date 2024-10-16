package com.cpe.springboot.jms;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveMQProducer {

    @Autowired
    private JmsTemplate jmsTemplate;

    public void sendMessageToTopic(String topicName, Object object) {
        jmsTemplate.convertAndSend(topicName, object);
    }
}

