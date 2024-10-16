package com.cpe.springboot.job.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class JobResultDTO {
    private int job_id;
    private Map<String, String> metadata;
}
