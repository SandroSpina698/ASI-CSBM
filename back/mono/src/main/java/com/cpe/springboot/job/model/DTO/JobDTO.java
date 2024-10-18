package com.cpe.springboot.job.model.DTO;

import com.cpe.springboot.job.model.JobStatus;
import com.cpe.springboot.job.model.JobStep;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private Integer id;
    private List<JobStepDTO> steps;
    private JobStatus status;
    private Map<String, String> metadata;
}
