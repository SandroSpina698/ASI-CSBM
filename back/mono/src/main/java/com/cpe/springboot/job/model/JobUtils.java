package com.cpe.springboot.job.model;

import com.cpe.springboot.job.model.DTO.JobDTO;
import com.cpe.springboot.job.model.DTO.JobResultDTO;
import com.cpe.springboot.job.model.DTO.JobStepDTO;
import org.springframework.boot.autoconfigure.batch.BatchProperties;

import java.util.List;

public class JobUtils {
    public static boolean everyStepsFinished(Job job) {
        return job.getSteps().stream().filter(i -> i.getStatus() == JobStatus.FINISHED).count() == job.getSteps().size();
    }

    public static boolean metadataContainKey(Job job, String key) {
        return job.getMetadata() != null && job.getMetadata().get(key) != null;
    }

    public static boolean metadataContainKey(JobResultDTO jobResult, String key) {
        return jobResult.getMetadata() != null && jobResult.getMetadata().get(key) != null;
    }

    public static JobStep getStepByType(Job job, String type) {
        if (job.getSteps() != null && !job.getSteps().isEmpty() && job.getSteps().stream().filter(i -> i.getType().equals(type)).count() == 1) {
            return job.getSteps().stream().filter(i -> i.getType().equals(type)).findFirst().get();
        }
        return null;
    }

    public static JobStepDTO jobStepToDTO(JobStep jobStep){
        return new JobStepDTO(jobStep.getId(),jobStep.getJob().getId(),jobStep.getMetadata(),jobStep.getType(),jobStep.getStatus());
    }

    public static List<JobStepDTO> jobStepsToDTO(List<JobStep> jobSteps){
        return jobSteps.stream().map(JobUtils::jobStepToDTO).toList();
    }
    public static JobDTO jobToDTO(Job job){
        return new JobDTO(job.getId(), jobStepsToDTO(job.getSteps()),job.getStatus(), job.getMetadata());
    }

    public static List<JobDTO> jobsToDTO(List<Job> jobs){
        return jobs.stream().map(JobUtils::jobToDTO).toList();
    }
}
