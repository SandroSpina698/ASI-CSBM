package com.cpe.springboot.generation.controller;

import com.cpe.springboot.generation.model.GenerationJobUtils;
import com.cpe.springboot.generation.model.RequestDTO;
import com.cpe.springboot.generation.model.ResultDTO;
import com.cpe.springboot.jms.service.ActiveMQProducer;
import com.cpe.springboot.job.controller.JobService;
import com.cpe.springboot.job.model.*;
import com.cpe.springboot.store.model.CardGenerationOrder;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class CardGenerationService {
    private final JobService jobService;
    private ActiveMQProducer producer;

    public int generate(CardGenerationOrder cardGenerationOrder) {
        Job job = Job.builder()
                .metadata(Map.of("user_id", String.valueOf(cardGenerationOrder.getUser_id()), "store_id", String.valueOf(cardGenerationOrder.getStore_id())))
                .build();

        Job savedJob = jobService.saveJob(job);

        JobStep imageStep = GenerationJobUtils.createImageGenerationJobStep(savedJob.getId(), cardGenerationOrder.getPrompt(), producer);
        JobStep textStep = GenerationJobUtils.createTextGenerationJobStep(savedJob.getId(), cardGenerationOrder.getPrompt(), producer);
        savedJob.setSteps(List.of(imageStep, textStep));

        savedJob = jobService.saveJob(savedJob);

        return jobService.execJob(savedJob);
    }

    public boolean continueGeneration(ResultDTO resultDTO) {

        JobResultDTO jobResultDTO = new JobResultDTO();
        jobResultDTO.setJob_id(resultDTO.getJob_id());
        jobResultDTO.setMetadata(resultDTO.getMetadata());

        // Properties generation ended case
        if (JobUtils.metadataContainKey(jobResultDTO, "last-step")) {
            // TODO :: add card ...
        }else{
            // A step is finished
            Job job = jobService.updateJobStep(jobResultDTO);

            if (JobUtils.everyStepsFinished(job)) {
                GenerationJobUtils.askPropertiesGeneration(jobResultDTO.getJob_id(), jobResultDTO.getMetadata().get("prompt"),producer);
            }
        }

        return true;
    }
}
