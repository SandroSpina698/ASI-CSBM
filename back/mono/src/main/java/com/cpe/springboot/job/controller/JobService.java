package com.cpe.springboot.job.controller;

import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.JobResultDTO;
import com.cpe.springboot.job.model.JobStatus;
import com.cpe.springboot.job.model.JobStep;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JobService {
    public final JobRepository jobRepository;
    public final JobStepRepository jobStepRepository;

    public List<Job> getAllJobs() {
        return (List<Job>) jobRepository.findAll();
    }

    public Job getJobById(Integer id){
        return jobRepository.findById(id).get();
    }

    public List<Job> getRunningJobs(){
        return jobRepository.findByStatus(JobStatus.RUNNING);
    }

    public List<Job> getFinishedJobs(){
        return jobRepository.findByStatus(JobStatus.FINISHED);
    }

    public List<Job> getFailedJobs(){
        return jobRepository.findByStatus(JobStatus.FAILED);
    }

    public int execJob(Job job){
        job.setStatus(JobStatus.RUNNING);
        for (JobStep step : job.getSteps()){
            step.setStatus(JobStatus.RUNNING);
            step.getRunnable().run();
        }
        return job.getId();
    }

    public Job updateJobStep(JobResultDTO jobResult) {
        Optional<Job> optionalJob = jobRepository.findById(jobResult.getJob_id());
        if (optionalJob.isEmpty()){
            throw new RuntimeException("No job was found for id : " + jobResult.getJob_id());
        }
        Job job = optionalJob.get();

        JobStep step = findJobStepByType(job, jobResult.getMetadata().get("type"));
        if (step == null){
            throw new RuntimeException("No step for type '" + jobResult.getMetadata().get("type") + "' in job '" + job.getId() + "' ");
        }

        step.setStatus(JobStatus.FINISHED);
        step.setMetadata(jobResult.getMetadata());

        return jobRepository.save(job);
    }

    private JobStep findJobStepByType(Job job, String type){
        Iterator<JobStep> iterator = job.getSteps().iterator();

        while (iterator.hasNext()) {
            JobStep step = iterator.next();
            if (step.getType().equals(type)){
                return step;
            }
        }

        return null;
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public List<JobStep> saveJobSteps(List<JobStep> steps) {
        return (List<JobStep>) jobStepRepository.saveAll(steps);
    }
}
