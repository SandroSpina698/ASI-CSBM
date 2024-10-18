package com.csbm.generate.text;

import com.csbm.generate.text.model.DTO.TextGenerateDTO;
import com.csbm.generate.text.service.JobTextPictureService;
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
public class GenerateTextApplication {

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public TextGenerateDTO textGenerateDTO() { return new TextGenerateDTO("qwen2:0.5b",false); }

	@Bean
	public JobTextPictureService getJobGeneratePictureService() {
		return new JobTextPictureService();
	}

	@Bean
	public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(ActiveMQConnectionFactory connectionFactory) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		factory.setConnectionFactory(connectionFactory);
		factory.setPubSubDomain(false);  // Important : true pour les topics, false pour les queues
		return factory;
	}

	public static void main(String[] args) {
		SpringApplication.run(GenerateTextApplication.class, args);
	}

}
