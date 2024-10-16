package com.cpe.springboot.job.controller;

import com.cpe.springboot.job.model.Job;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value="/job")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;

    @RequestMapping(method = RequestMethod.GET)
    private List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/running")
    private List<Job> getRunningJobs() {
        return jobService.getRunningJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/finished")
    private List<Job> getFinishedJobs() {
        return jobService.getFinishedJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/failed")
    private List<Job> getFailedJobs() {
        return jobService.getFailedJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    private Job getJobById(@PathVariable String id) {
        return jobService.getJobById(Integer.valueOf(id));
    }
}
