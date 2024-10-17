package com.csbm.generate.text.model.DTO;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TextRequestDTO {
    private int job_id;
    private Map<String,String> metadata;
}
