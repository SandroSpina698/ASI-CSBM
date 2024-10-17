package com.csbm.generate.picture;

import com.csbm.generate.picture.service.JobGeneratePictureService;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.web.client.RestTemplate;

@EnableJms
@Configuration
@SpringBootApplication
public class GeneratePictureApplication {

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public JobGeneratePictureService getJobGeneratePictureService() {
		return new JobGeneratePictureService();
	}

	@Bean
	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ActiveMQConnectionFactory connectionFactory) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setConnectionFactory(connectionFactory);
		factory.setPubSubDomain(false);  // Important : true pour les topics, false pour les queues
		return factory;
	}

	public static void main(String[] args) {
		SpringApplication.run(GeneratePictureApplication.class, args);
	}

}
