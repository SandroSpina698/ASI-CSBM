package com.cpe.springboot.generation.controller;

import com.cpe.springboot.generation.model.GenerationJobUtils;
import com.cpe.springboot.generation.model.ResultDTO;
import com.cpe.springboot.jms.ActiveMQProducer;
import com.cpe.springboot.job.controller.JobService;
import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.JobResultDTO;
import com.cpe.springboot.job.model.JobStep;
import com.cpe.springboot.job.model.JobUtils;
import com.cpe.springboot.store.model.CardGenerationOrder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class CardGenerationService {
    private final JobService jobService;
    private ActiveMQProducer producer;

    public int generate(CardGenerationOrder cardGenerationOrder) {
        // Create initial job with metadata
        Job job = Job.builder()
                .metadata(new HashMap<>(Map.of("user_id", String.valueOf(cardGenerationOrder.getUser_id()), "store_id", String.valueOf(cardGenerationOrder.getStore_id()))))
                .build();
        Job savedJob = jobService.saveJob(job);

        // Create steps for the job
        JobStep imageStep = GenerationJobUtils.createImageGenerationJobStep(savedJob, cardGenerationOrder.getPrompt(), producer);
        JobStep textStep = GenerationJobUtils.createTextGenerationJobStep(savedJob, cardGenerationOrder.getPrompt(), producer);
        savedJob.setSteps(Arrays.asList(imageStep, textStep));
        jobService.saveJobSteps(Arrays.asList(imageStep,textStep));

        // Execute the job and return the result
        return jobService.execJob(job);
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
