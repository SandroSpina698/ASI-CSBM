package com.cpe.springboot.job.controller;

import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.JobStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface JobRepository extends CrudRepository<Job, Integer> {
    List<Job> findByStatus(JobStatus status);
    Job findByJobStepId(Integer id);
}
