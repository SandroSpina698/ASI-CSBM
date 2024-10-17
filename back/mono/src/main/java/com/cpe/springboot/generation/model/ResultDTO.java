package com.cpe.springboot.generation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResultDTO {
    private int job_id;
    private Map<String, String> metadata;
}

