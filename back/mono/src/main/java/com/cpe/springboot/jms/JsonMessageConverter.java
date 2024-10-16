package com.cpe.springboot.jms;

import com.cpe.springboot.generation.model.RequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.Session;
import jakarta.jms.TextMessage;
import org.springframework.jms.support.converter.MessageConversionException;
import org.springframework.jms.support.converter.MessageConverter;



public class JsonMessageConverter implements MessageConverter {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Message toMessage(Object object, Session session) throws JMSException, MessageConversionException {
        try {
            String json = objectMapper.writeValueAsString(object);
            return session.createTextMessage(json);
        } catch (Exception e) {
            throw new MessageConversionException("Could not convert object to JSON", e);
        }
    }

    @Override
    public Object fromMessage(Message message) throws JMSException, MessageConversionException {
        try {
            String json = ((TextMessage) message).getText();
            return objectMapper.readValue(json, RequestDTO.class);
        } catch (Exception e) {
            throw new MessageConversionException("Could not convert JSON to object", e);
        }
    }
}

