package com.csbm.generate_property;

import com.csbm.generate_property.service.JobGeneratePropertyService;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;

@EnableJms
@Configuration
@SpringBootApplication
public class GeneratePropertyApplication {
	@Bean
	public JobGeneratePropertyService getJobGeneratePictureService() {
		return new JobGeneratePropertyService();
	}

	@Bean
	public ActiveMQConnectionFactory connectionFactory() {
		ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory();
		factory.setBrokerURL("tcp://localhost:61616");
		factory.setUserName("myuser");
		factory.setPassword("mypwd");
		return factory;
	}

	@Bean
	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ActiveMQConnectionFactory connectionFactory) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setConnectionFactory(connectionFactory);
		factory.setPubSubDomain(true);  // Important : true pour les topics, false pour les queues
		return factory;
	}

	public static void main(String[] args) {
		SpringApplication.run(GeneratePropertyApplication.class, args);
	}

}
