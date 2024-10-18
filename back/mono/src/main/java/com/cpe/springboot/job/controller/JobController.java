package com.cpe.springboot.job.controller;

import com.cpe.springboot.job.model.DTO.JobDTO;
import com.cpe.springboot.job.model.Job;
import com.cpe.springboot.job.model.JobUtils;
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
    private List<JobDTO> getAllJobs() {
        return jobService.getAllJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/running")
    private List<JobDTO> getRunningJobs() {
        return jobService.getRunningJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/finished")
    private List<JobDTO> getFinishedJobs() {
        return jobService.getFinishedJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/failed")
    private List<JobDTO> getFailedJobs() {
        return jobService.getFailedJobs();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    private JobDTO getJobById(@PathVariable String id) {
        return JobUtils.jobToDTO(jobService.getJobById(Integer.valueOf(id)));
    }
}
