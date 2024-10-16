package com.cpe.springboot.job.model;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.Map;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobStep {
    private Integer job_id;
    private Map<String, String> metadata;
    private String type;
    private JobStatus status;
    private Runnable runnable;
}
