package com.cpe.springboot.generation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
public class RequestDTO {
    private int job_id;
    private Map<String, String> metadata;
}
