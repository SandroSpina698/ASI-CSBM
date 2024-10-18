package com.cpe.springboot.job.model.DTO;

import com.cpe.springboot.job.model.JobStatus;
import lombok.*;

import java.util.Map;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobStepDTO {
    private Integer id;
    private int job;
    private Map<String, String> metadata;
    private String type;
    private JobStatus status;
}
