package com.csbm.generate.text.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequestDTO {
    private int job_id;
    private Map<String,String> metadata;
}
