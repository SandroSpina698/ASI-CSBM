package com.cpe.springboot.generation.model;

import com.cpe.springboot.jms.ActiveMQProducer;
import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.JobStatus;
import com.cpe.springboot.job.model.JobStep;

import java.util.HashMap;
import java.util.Map;

public class GenerationJobUtils {

    public static JobStep createImageGenerationJobStep(Job job, String prompt, ActiveMQProducer activeMQProducer) {
        return createGenerationJobStep(job, "image_generation", prompt, activeMQProducer, "gen-pic");
    }

    public static JobStep createTextGenerationJobStep(Job job, String prompt, ActiveMQProducer activeMQProducer) {
        return createGenerationJobStep(job, "text_generation", prompt, activeMQProducer, "gen-text");
    }

    private static JobStep createGenerationJobStep(Job job, String type, String prompt, ActiveMQProducer activeMQProducer, String topic) {
        return JobStep.builder()
                .job(job)
                .type(type)
                .metadata(Map.of("prompt", prompt))
                .status(JobStatus.RUNNING)
                .runnable(() -> {
                    RequestDTO requestDTO = new RequestDTO(job.getId(), new HashMap<>(Map.of("type", type, "prompt", prompt)));
                    activeMQProducer.sendMessageToTopic(topic, requestDTO);
                }).build();
    }

    public static void askPropertiesGeneration(int job_id, String urlImage, ActiveMQProducer producer){
        RequestDTO requestDTO = new RequestDTO(job_id, new HashMap<>(Map.of("last-step", "true", "url", urlImage)));
        producer.sendMessageToTopic("gen-props", requestDTO);
    }
}

