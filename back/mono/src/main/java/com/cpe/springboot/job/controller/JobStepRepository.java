package com.cpe.springboot.job.controller;

import com.cpe.springboot.job.model.JobStep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobStepRepository extends JpaRepository<JobStep, Integer> {
}
