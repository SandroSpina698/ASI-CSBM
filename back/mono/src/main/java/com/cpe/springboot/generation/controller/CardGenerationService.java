package com.cpe.springboot.generation.controller;

import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.generation.model.GenerationJobUtils;
import com.cpe.springboot.generation.model.ResultDTO;
import com.cpe.springboot.jms.ActiveMQProducer;
import com.cpe.springboot.job.controller.JobService;
import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.DTO.JobResultDTO;
import com.cpe.springboot.job.model.JobStatus;
import com.cpe.springboot.job.model.JobStep;
import com.cpe.springboot.job.model.JobUtils;
import com.cpe.springboot.store.model.CardGenerationOrder;
import com.cpe.springboot.user.controller.UserService;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class CardGenerationService {
    private final JobService jobService;
    private final UserService userService;
    private ActiveMQProducer producer;
    private final ObjectMapper om = new ObjectMapper();

    public int generate(CardGenerationOrder cardGenerationOrder) {
        // Create initial job with metadata
        Job job = Job.builder()
                .metadata(new HashMap<>(Map.of("user_id", String.valueOf(cardGenerationOrder.getUser_id()), "store_id", String.valueOf(cardGenerationOrder.getStore_id()), "promptImage", cardGenerationOrder.getPromptImage(), "promptDescription", cardGenerationOrder.getPromptDescription())))
                .status(JobStatus.RUNNING)
                .build();
        Job savedJob = jobService.saveJob(job);

        // Create steps for the job
        JobStep imageStep = GenerationJobUtils.createImageGenerationJobStep(savedJob, cardGenerationOrder.getPromptImage(), producer);
        JobStep textStep = GenerationJobUtils.createTextGenerationJobStep(savedJob, cardGenerationOrder.getPromptDescription(), producer);
        savedJob.setSteps(Arrays.asList(imageStep, textStep));
        jobService.saveJobSteps(Arrays.asList(imageStep,textStep));

        // Execute the job and return the result
        return jobService.execJob(job).getId();
    }


    public boolean continueGeneration(ResultDTO resultDTO) {

        JobResultDTO jobResultDTO = new JobResultDTO();
        jobResultDTO.setJob_id(resultDTO.getJob_id());
        jobResultDTO.setMetadata(resultDTO.getMetadata());

        // Properties generation ended case
        if (JobUtils.metadataContainKey(jobResultDTO, "last-step")) {
            addCard(jobResultDTO);
        }else{
            // A step is finished
            Job job = jobService.updateJobStep(jobResultDTO);

            if (JobUtils.everyStepsFinished(job)) {
                GenerationJobUtils.askPropertiesGeneration(jobResultDTO.getJob_id(), jobResultDTO.getMetadata().get(""),producer);
            }
        }

        return true;
    }

    public boolean addCard(JobResultDTO propGenResult){
        Job job = jobService.getJobById(propGenResult.getJob_id());

        JobStep imageStep = JobUtils.getStepByType(job, "image_generation");
        JobStep textStep = JobUtils.getStepByType(job, "text_generation");


        String name = propGenResult.getMetadata().get("name");
        String description = textStep.getMetadata().get("description");
        String family = propGenResult.getMetadata().get("family");
        String affinity = propGenResult.getMetadata().get("affinity");
        float energy = Float.valueOf(propGenResult.getMetadata().get("energy"));
        float hp = Float.valueOf(propGenResult.getMetadata().get("hp"));
        float defence = Float.valueOf(propGenResult.getMetadata().get("defence"));
        float attack = Float.valueOf(propGenResult.getMetadata().get("attack"));
        String imgUrl = imageStep.getMetadata().get("url");
        String smallImg = null;
        float price = Float.valueOf(propGenResult.getMetadata().get("price"));

        CardModel card = new CardModel(name, description, family, affinity, energy, hp, defence, attack, imgUrl, smallImg, price);
        UserModel user = userService.getUser(job.getMetadata().get("user_id")).get();
        if (user.getAccount() < card.getPrice()){
            throw new RuntimeException("Card is too expensive");
        }

        user.setAccount(user.getAccount()- card.getPrice());
        user.addCard(card);

        userService.updateUser(user);

        return true;
    }
}
