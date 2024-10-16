package com.cpe.springboot.generation.model;

import com.cpe.springboot.jms.service.ActiveMQProducer;
import com.cpe.springboot.job.model.JobStep;

import java.util.Map;

public class GenerationJobUtils {

    public static JobStep createImageGenerationJobStep(int job_id, String prompt, ActiveMQProducer activeMQProducer) {
        return createGenerationJobStep(job_id, "image_generation", prompt, activeMQProducer, "gen-pic");
    }

    public static JobStep createTextGenerationJobStep(int job_id, String prompt, ActiveMQProducer activeMQProducer) {
        return createGenerationJobStep(job_id, "text_generation", prompt, activeMQProducer, "gen-text");
    }

    private static JobStep createGenerationJobStep(int job_id, String type, String prompt, ActiveMQProducer activeMQProducer, String topic) {
        return JobStep.builder()
                .job_id(job_id)
                .type(type)
                .metadata(Map.of("prompt", prompt))
                .runnable(() -> {
                    RequestDTO requestDTO = new RequestDTO(job_id, Map.of("type", type, "prompt", prompt));
                    activeMQProducer.sendMessageToTopic(topic, requestDTO);
                }).build();
    }

    public static void askPropertiesGeneration(int job_id, String prompt, ActiveMQProducer producer){
        RequestDTO requestDTO = new RequestDTO(job_id, Map.of("last-step", "true", "prompt", prompt));
        producer.sendMessageToTopic("gen-props", requestDTO);
    }
}

