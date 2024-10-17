package com.cpe.springboot.job.model;

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
}
