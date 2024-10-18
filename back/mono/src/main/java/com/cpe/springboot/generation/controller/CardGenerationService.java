package com.cpe.springboot.generation.controller;

import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.generation.model.GenerationException;
import com.cpe.springboot.generation.model.GenerationJobUtils;
import com.cpe.springboot.generation.model.ResultDTO;
import com.cpe.springboot.jms.ActiveMQProducer;
import com.cpe.springboot.job.controller.JobService;
import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.DTO.JobResultDTO;
import com.cpe.springboot.job.model.JobStatus;
import com.cpe.springboot.job.model.JobStep;
import com.cpe.springboot.job.model.JobUtils;
import com.cpe.springboot.sse.SseService;
import com.cpe.springboot.store.model.CardGenerationOrder;
import com.cpe.springboot.user.controller.UserService;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@AllArgsConstructor
public class CardGenerationService {
    private final JobService jobService;
    private final UserService userService;
    private ActiveMQProducer producer;
    private SseService sseService;

    private final ObjectMapper om = new ObjectMapper();

    public int generate(CardGenerationOrder cardGenerationOrder) throws GenerationException {
        if(userService.getUser(cardGenerationOrder.getUser_id()).isEmpty()){
            throw new GenerationException("User not found.");
        }


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
                JobStep imageStep = JobUtils.getStepByType(job, "image_generation");
                GenerationJobUtils.askPropertiesGeneration(jobResultDTO.getJob_id(), imageStep.getMetadata().get("url"),producer);
            }
        }

        return true;
    }

    public boolean addCard(JobResultDTO propGenResult){
        Job job = jobService.getJobById(propGenResult.getJob_id());

        JobStep imageStep = JobUtils.getStepByType(job, "image_generation");
        JobStep textStep = JobUtils.getStepByType(job, "text_generation");


        String name = null;
        String description = textStep.getMetadata().get("description");
        String family = null;
        String affinity = null;
        float energy = Float.valueOf(propGenResult.getMetadata().get("ENERGY"));
        float hp = Float.valueOf(propGenResult.getMetadata().get("HP"));
        float defence = Float.valueOf(propGenResult.getMetadata().get("DEFENSE"));
        float attack = Float.valueOf(propGenResult.getMetadata().get("ATTACK"));
        String imgUrl = imageStep.getMetadata().get("url");
        String smallImg = null;

        CardModel card = new CardModel(name, description, family, affinity, energy, hp, defence, attack, imgUrl, smallImg);
        UserModel user = userService.getUser(job.getMetadata().get("user_id")).get();
        if (user.getAccount() < card.getPrice()){
            throw new RuntimeException("Card is too expensive");
        }

        user.setAccount(user.getAccount()- card.getPrice());
        user.addCard(card);

        userService.updateUser(user);

        sseService.sendMessage("card-generated", user.getId());

        return true;
    }
}
