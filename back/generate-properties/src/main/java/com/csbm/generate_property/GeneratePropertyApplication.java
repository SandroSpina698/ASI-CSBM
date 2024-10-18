package com.csbm.generate_property;

import com.csbm.generate_property.service.JobGeneratePropertyService;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.web.client.RestTemplate;

@EnableJms
@Configuration
@SpringBootApplication
public class GeneratePropertyApplication {
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public JobGeneratePropertyService getGeneratePropertyService() {
		return new JobGeneratePropertyService();
	}

	@Bean
	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ActiveMQConnectionFactory connectionFactory) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setConnectionFactory(connectionFactory);
		factory.setPubSubDomain(false);  // Important : true pour les topics, false pour les queues
		return factory;
	}

	public static void main(String[] args) {
		SpringApplication.run(GeneratePropertyApplication.class, args);
	}

}
