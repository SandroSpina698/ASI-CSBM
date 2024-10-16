package com.cpe.springboot;

import com.cpe.springboot.jms.JsonMessageConverter;
import jakarta.jms.ConnectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.EnableJms;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.jms.core.JmsTemplate;

@EnableJms
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Card Market Rest Api", version = "1.0", description = "Information about the Card Market APi and how to interact with"))
// doc here localhost:8080/swagger-ui.html
public class CardMngMonolithicApplication {

	@Bean
	public JmsTemplate jmsTemplate(ConnectionFactory connectionFactory) {
		JmsTemplate jmsTemplate = new JmsTemplate(connectionFactory);
		jmsTemplate.setMessageConverter(new JsonMessageConverter());
		return jmsTemplate;
	}

	public static void main(String[] args) {
		SpringApplication.run(CardMngMonolithicApplication.class, args);
	}
}
