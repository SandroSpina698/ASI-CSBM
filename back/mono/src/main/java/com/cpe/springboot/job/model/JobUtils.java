package com.cpe.springboot.job.model;

public class JobUtils {
    public static boolean everyStepsFinished(Job job){
        return job.getSteps().stream().filter(i->i.getStatus() == JobStatus.FINISHED).count() == job.getSteps().size();
    }
    public static boolean metadataContainKey(Job job, String key){
        return job.getMetadata() != null && job.getMetadata().get(key) != null;
    }

    public static boolean metadataContainKey(JobResultDTO jobResult, String key){
        return jobResult.getMetadata() != null && jobResult.getMetadata().get(key) != null;
    }
}
